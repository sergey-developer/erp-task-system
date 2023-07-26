import { Feature, MapBrowserEvent } from 'ol'
import { FeatureLike } from 'ol/Feature'
import OlMap from 'ol/Map'
import View from 'ol/View'
import { Coordinate } from 'ol/coordinate'
import { createEmpty, extend, getHeight, getWidth } from 'ol/extent'
import { Point } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat } from 'ol/proj'
import { Cluster, OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style, Text, Icon } from 'ol/style'
import CircleStyle from 'ol/style/Circle'
import { useState, useEffect, useRef, FC } from 'react'

import { MapWrapperStyled } from './styles'

const styleCache: Record<number, Style> = {}

export type MapProps = {
  coords?: Array<number[]>
}

const Map: FC<MapProps> = ({ coords }) => {
  const [map, setMap] = useState<OlMap>()
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<Cluster>>()
  const [selectedCoord, setSelectedCoord] = useState<Coordinate>()

  const mapWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapWrapperRef.current !== null) {
      const clusterSource = new Cluster({
        distance: 100,
        minDistance: 50,
        source: new VectorSource(),
      })

      const initialFeaturesLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => {
          const features = feature.get('features') as Feature[]
          const size = features.length
          let style = styleCache[size]
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                fill: new Fill({
                  color: '#EB5757',
                }),
              }),
              // image: new Icon({
              //   src: 'src/map-marker-sm.svg',
              //   size: [14, 14]
              // }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: '#fff',
                }),
              }),
            })
            styleCache[size] = style
          }
          return style
        },
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
    if (coords?.length && featuresLayer) {
      const features = coords.map((c) => new Feature(new Point(fromLonLat(c))))

      featuresLayer.setSource(
        new Cluster({ source: new VectorSource({ features }) }),
      )

      // const source = featuresLayer.getSource()

      // if (map && source) {
      // console.log(source.getExtent());
      // const extent = source.getExtent()
      // const extent = boundingExtent(
      //   features.map((r) => r.getGeometry()!.getCoordinates()),
      // )
      // console.log({ extent })

      // if (extent.length) {
      //   map.getView().fit(extent)
      // }
      // }
    }
  }, [coords, featuresLayer, map])

  const handleMapClick = (event: MapBrowserEvent<any>) => {
    if (map && featuresLayer) {
      featuresLayer.getFeatures(event.pixel).then((features) => {
        console.log(features)
        if (features.length > 0) {
          const clusterMembers: FeatureLike[] = features[0].get('features')
          if (clusterMembers.length > 1) {
            // Calculate the extent of the cluster members.
            const extent = createEmpty()
            clusterMembers.forEach((feature) =>
              extend(extent, feature.getGeometry()!.getExtent()),
            )
            const view = map.getView()
            const resolution = map.getView().getResolution()!
            if (
              view.getZoom() === view.getMaxZoom() ||
              (getWidth(extent) < resolution && getHeight(extent) < resolution)
            ) {
              // Show an expanded view of the cluster members.
              // clickFeature = features[0]
              // clickResolution = resolution
              // clusterCircles.setStyle(clusterCircleStyle)
            } else {
              // Zoom to the extent of the cluster members.
              view.fit(extent, { duration: 500, padding: [50, 50, 50, 50] })
            }
          }
        }
      })
    }
  }

  return <MapWrapperStyled ref={mapWrapperRef} />
}

export default Map
