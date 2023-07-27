import SelectedMarkerIcon from 'assets/icons/task-map-marker-lg.svg'
import DefaultMarkerIcon from 'assets/icons/task-map-marker-sm.svg'
import { Feature, MapBrowserEvent } from 'ol'
import OlMap from 'ol/Map'
import View from 'ol/View'
import { click } from 'ol/events/condition'
import { boundingExtent } from 'ol/extent'
import { Point } from 'ol/geom'
import { Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import { Cluster, OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { Fill, Style, Text, Icon, Circle } from 'ol/style'
import { useState, useEffect, useRef, FC } from 'react'

import { isTruthy } from 'shared/utils/common'

import { MapWrapperStyled } from './styles'

const styleCache: Record<number, Style> = {}

const defaultMarkerStyle = new Style({
  image: new Icon({
    src: DefaultMarkerIcon,
    size: [24, 24],
  }),
})

const selectedMarkerStyle = new Style({
  image: new Icon({
    src: SelectedMarkerIcon,
    size: [48, 48],
  }),
})

const circle = new Circle({
  radius: 10,
  fill: new Fill({
    color: '#EB5757',
  }),
})

const circleTextFill = new Fill({
  color: '#fff',
})

const selectClick = new Select({
  condition: click,
  style: selectedMarkerStyle,
})

export type TaskListMapProps = {
  coords?: Array<number[]>
}

const TaskListMap: FC<TaskListMapProps> = ({ coords }) => {
  const [map, setMap] = useState<OlMap>()
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<Cluster>>()
  const [selectedFeature, setSelectedFeature] = useState<Feature>()
  const mapWrapperRef = useRef<HTMLDivElement>(null)

  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    selectClick.on('select', (event) => {
      if (!event.selected.length && event.deselected.length) {
        setSelectedFeature(undefined)
      }
    })
  }, [])

  useEffect(() => {
    if (mapWrapperRef.current !== null) {
      const clusterSource = new Cluster({
        distance: 100,
        minDistance: 50,
        source: new VectorSource(),
      })

      const initialFeaturesLayer = new VectorLayer({
        source: clusterSource,
      })

      const initialMap = new OlMap({
        target: mapWrapperRef.current,
        layers: [new TileLayer({ source: new OSM() }), initialFeaturesLayer],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
        controls: [],
      })

      initialMap.on('click', handleMapClick)

      setMap(initialMap)
      setFeaturesLayer(initialFeaturesLayer)

      return () => initialMap.setTarget(undefined)
    }
  }, [])

  useEffect(() => {
    if (featuresLayer) {
      featuresLayer.setStyle((feature) => {
        const features = feature.get('features') as Feature[]
        const size = features.length
        let style = styleCache[size]

        if (size === 1) {
          if (selectedFeature === features[0]) {
            return selectedMarkerStyle
          }
        }

        if (!style) {
          if (size === 1) {
            style = defaultMarkerStyle
          } else {
            style = new Style({
              image: circle,
              text: new Text({
                text: size.toString(),
                fill: circleTextFill,
              }),
            })
          }

          styleCache[size] = style
        }

        return style
      })
    }
  }, [featuresLayer, selectedFeature])

  useEffect(() => {
    if (coords?.length && featuresLayer) {
      const features = coords.map((c) => new Feature(new Point(fromLonLat(c))))

      // add features to map
      featuresLayer.setSource(
        new Cluster({ source: new VectorSource({ features }) }),
      )

      // fit view to features
      if (mapRef.current) {
        const extent = boundingExtent(
          features
            .map((f) => f.getGeometry())
            .filter(isTruthy)
            .map((f) => f.getExtent()),
        )

        if (extent.length) {
          mapRef.current.getView().fit(extent, { padding: [50, 50, 50, 50] })
        }
      }
    }
  }, [coords, featuresLayer])

  const handleMapClick = (event: MapBrowserEvent<any>) => {
    if (mapRef.current) {
      // increase marker
      const featuresAtPixel = mapRef.current.getFeaturesAtPixel(event.pixel)

      if (featuresAtPixel.length) {
        const features = featuresAtPixel[0].get('features') as Feature[]
        if (features.length === 1) {
          mapRef.current.addInteraction(selectClick)
          setSelectedFeature(features[0])
        } else {
          mapRef.current.removeInteraction(selectClick)
        }
      }
    }
  }

  return <MapWrapperStyled ref={mapWrapperRef} />
}

export default TaskListMap
