import { Feature } from 'ol'
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
import { useState, useEffect, useRef, FC } from 'react'

import { isTruthy } from 'shared/utils/common'

import { FeatureData, TaskListMapProps } from './interfaces'
import { MapWrapperStyled } from './styles'
import { getSelectedMarkerStyle, setFeaturesLayerStyleFn } from './utils'

const interactionSelect = new Select({
  condition: (event) => {
    const length = event.map
      .getFeaturesAtPixel(event.pixel)[0]
      ?.get('features').length

    if (!length || length === 1) {
      return click(event)
    } else {
      return false
    }
  },
})

const TaskListMap: FC<TaskListMapProps> = ({ tasks }) => {
  const [map, setMap] = useState<OlMap>()
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<Cluster>>()
  const [selectedFeature, setSelectedFeature] = useState<Feature>()
  const mapWrapperRef = useRef<HTMLDivElement>(null)

  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    interactionSelect.on('select', (event) => {
      if (event.selected.length) {
        setSelectedFeature(event.selected[0].get('features')[0])
      } else if (event.deselected.length) {
        setSelectedFeature(undefined)
      }
    })
  }, [])

  useEffect(() => {
    if (selectedFeature) {
      const selectedFeatureData: FeatureData = selectedFeature.get('data')

      const interactionSelectFeatures = interactionSelect
        .getFeatures()
        .getArray()

      if (interactionSelectFeatures.length) {
        const childFeatures = interactionSelectFeatures[0].get('features')

        if (childFeatures.length) {
          const firstChildFeatureData: FeatureData =
            childFeatures[0].get('data')

          if (selectedFeatureData.id === firstChildFeatureData.id) {
            selectedFeature.setStyle(
              getSelectedMarkerStyle(selectedFeatureData.type),
            )
          }
        }
      }
    }
  }, [selectedFeature])

  useEffect(() => {
    if (mapWrapperRef.current) {
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
        view: new View(),
        controls: [],
      })

      initialMap.addInteraction(interactionSelect)

      setMap(initialMap)
      setFeaturesLayer(initialFeaturesLayer)

      return () => initialMap.setTarget(undefined)
    }
  }, [])

  useEffect(() => {
    if (featuresLayer) {
      featuresLayer.setStyle(setFeaturesLayerStyleFn(selectedFeature))
    }
  }, [featuresLayer, selectedFeature])

  useEffect(() => {
    if (tasks.length && featuresLayer) {
      // make features
      const features = tasks.map(({ id, type, long, lat }) => {
        const feature = new Feature(
          new Point(fromLonLat([Number(long), Number(lat)])),
        )

        feature.set('data', { id, type })

        return feature
      })

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
          mapRef.current
            .getView()
            .fit(extent, { padding: [100, 100, 100, 100] })
        }
      }
    }
  }, [tasks, featuresLayer])

  return <MapWrapperStyled ref={mapWrapperRef} />
}

export default TaskListMap
