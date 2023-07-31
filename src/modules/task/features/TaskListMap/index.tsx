import { Feature } from 'ol'
import OlMap from 'ol/Map'
import View from 'ol/View'
import { Coordinate } from 'ol/coordinate'
import { click } from 'ol/events/condition'
import { boundingExtent } from 'ol/extent'
import { Geometry, Point } from 'ol/geom'
import { Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Cluster, OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { useState, useEffect, useRef, FC } from 'react'

import { MaybeNull } from 'shared/interfaces/utils'
import { isTruthy } from 'shared/utils/common'

import { FeatureData, TaskListMapProps } from './interfaces'
import { MapWrapperStyled, selectedClusterStyle } from './styles'
import {
  getClusterStyle,
  getMarkerStyle,
  getSelectedMarkerStyle,
  styleCache,
} from './utils'

const interactionSelect = new Select({
  condition: click,
})

const TaskListMap: FC<TaskListMapProps> = ({ tasks, onClickTask }) => {
  const [map, setMap] = useState<OlMap>()
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<Cluster>>()

  const [selectedFeature, setSelectedFeature] =
    useState<MaybeNull<Feature>>(null)

  const mapWrapperRef = useRef<HTMLDivElement>(null)

  const mapRef = useRef<OlMap>()
  mapRef.current = map

  useEffect(() => {
    interactionSelect.on('select', (event) => {
      if (event.selected.length) {
        const selectedFeature = event.selected[0]
        const features: Feature[] = selectedFeature.get('features')

        if (features.length) {
          if (features.length === 1) {
            const data: FeatureData = features[0].get('data')
            selectedFeature.setStyle(getSelectedMarkerStyle(data.type))
          } else {
            selectedFeature.setStyle(selectedClusterStyle)
          }
        }

        const geometry = selectedFeature.getGeometry()

        if (geometry) {
          const coords = (
            geometry as Geometry & { getCoordinates: () => Coordinate }
          ).getCoordinates()

          onClickTask(toLonLat(coords))
        }

        setSelectedFeature(selectedFeature)
      } else if (event.deselected.length) {
        setSelectedFeature(null)
      }
    })
  }, [onClickTask])

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
      featuresLayer.setStyle((feature) => {
        const features = feature.get('features') as Feature[]

        if (features.length) {
          const size = features.length
          const isOneFeature = size === 1

          const firstFeatureData: FeatureData = features[0].get('data')

          let styleBySize = styleCache[size]
          let styleByType = styleCache[firstFeatureData.type]

          if (selectedFeature) {
            const selectedFeatureFeatures: Feature[] =
              selectedFeature.get('features')
            const selectedFeatureFeaturesSize = selectedFeatureFeatures.length

            if (selectedFeatureFeaturesSize) {
              if (selectedFeatureFeaturesSize === 1) {
                const selectedFeatureData: FeatureData =
                  selectedFeatureFeatures[0].get('data')

                if (firstFeatureData.id === selectedFeatureData.id) {
                  return getSelectedMarkerStyle(selectedFeatureData.type)
                }
              } else {
                const selectedFeaturesIds = selectedFeatureFeatures.map((f) => {
                  const data: FeatureData = f.get('data')
                  return data.id
                })
                const featuresIds = features.map((f) => {
                  const data: FeatureData = f.get('data')
                  return data.id
                })

                if (
                  selectedFeaturesIds.every((id) => featuresIds.includes(id))
                ) {
                  return selectedClusterStyle
                }
              }
            }
          }

          if (isOneFeature) {
            if (!styleByType) {
              styleByType = getMarkerStyle(firstFeatureData.type)
              styleCache[firstFeatureData.type] = styleByType
            }

            return styleByType
          } else {
            if (!styleBySize) {
              styleBySize = getClusterStyle(size)
              styleCache[size] = styleBySize
            }

            return styleBySize
          }
        }
      })
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
