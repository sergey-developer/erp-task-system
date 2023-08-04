import { Feature } from 'ol'
import OlMap from 'ol/Map'
import View from 'ol/View'
import { click } from 'ol/events/condition'
import { boundingExtent } from 'ol/extent'
import { Point } from 'ol/geom'
import { Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import { fromLonLat, toLonLat } from 'ol/proj'
import { Cluster, OSM } from 'ol/source'
import VectorSource from 'ol/source/Vector'
import { Style } from 'ol/style'
import { FC, useCallback, useEffect, useRef, useState } from 'react'

import { TaskTypeEnum } from 'modules/task/constants'

import { MaybeNull } from 'shared/types/utils'

import { MapWrapperStyled } from './styles'
import { FeatureData, Geometry, TaskListMapProps } from './types'
import {
  checkFeaturesHaveSameCoords,
  fitMapToExtent,
  formatCoords,
  getClusterStyle,
  getFeatureData,
  getFeaturesCoordinate,
  getFeaturesData,
  getFeaturesGeometry,
  getFeaturesWithin,
  getGeometriesExtent,
  getMarkerStyle,
  getPriorityTaskType,
  getSelectedMarkerStyle,
} from './utils'

const interactionSelect = new Select({
  condition: click,
})

const styleCache: Partial<Record<number | TaskTypeEnum, Style>> = {}

const TaskListMap: FC<TaskListMapProps> = ({ tasks, onClickTask }) => {
  const [map, setMap] = useState<OlMap>()
  const [featuresLayer, setFeaturesLayer] = useState<VectorLayer<Cluster>>()

  const [selectedFeature, setSelectedFeature] =
    useState<MaybeNull<Feature>>(null)

  const mapWrapperRef = useRef<HTMLDivElement>(null)

  const mapRef = useRef<OlMap>()
  mapRef.current = map

  const handleClickFeature = useCallback(
    (feature: Feature) => {
      const geometry = feature.getGeometry()

      if (geometry) {
        const coords = (geometry as Geometry).getCoordinates()
        onClickTask(formatCoords(toLonLat(coords)))
      }

      setSelectedFeature(feature)
    },
    [onClickTask],
  )

  useEffect(() => {
    interactionSelect.on('select', (event) => {
      if (event.selected.length) {
        const selectedFeature = event.selected[0]
        const features = getFeaturesWithin(selectedFeature)

        if (!features.length) return

        if (features.length === 1) {
          const data: FeatureData = getFeatureData(features[0])
          const markerStyle = getSelectedMarkerStyle(data.type)
          selectedFeature.setStyle(markerStyle)
          handleClickFeature(selectedFeature)
        } else {
          const featuresCoords = getFeaturesCoordinate(
            getFeaturesGeometry(features),
          )

          const isFeaturesHaveSameCoords =
            checkFeaturesHaveSameCoords(featuresCoords)

          if (isFeaturesHaveSameCoords) {
            const featuresData = getFeaturesData(features)
            const priorityTaskType = getPriorityTaskType(featuresData)
            const markerStyle = getSelectedMarkerStyle(priorityTaskType)
            selectedFeature.setStyle(markerStyle)
            handleClickFeature(selectedFeature)
          }
        }
      } else if (event.deselected.length) {
        setSelectedFeature(null)
      }
    })
  }, [handleClickFeature])

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
      initialMap.on('click', (e) => {
        initialFeaturesLayer.getFeatures(e.pixel).then((clickedFeatures) => {
          if (clickedFeatures.length) {
            const features: Feature[] = getFeaturesWithin(clickedFeatures[0])
            const featuresGeometry = getFeaturesGeometry(features)
            const featuresCoords = getFeaturesCoordinate(featuresGeometry)

            const isFeaturesHaveSameCoords =
              checkFeaturesHaveSameCoords(featuresCoords)

            if (features.length > 1 && !isFeaturesHaveSameCoords) {
              const extent = boundingExtent(
                getGeometriesExtent(featuresGeometry),
              )

              fitMapToExtent(initialMap, extent)
            }
          }
        })
      })

      setMap(initialMap)
      setFeaturesLayer(initialFeaturesLayer)

      return () => initialMap.setTarget(undefined)
    }
  }, [])

  useEffect(() => {
    if (featuresLayer) {
      featuresLayer.setStyle((feature) => {
        const features = getFeaturesWithin(feature)

        if (features.length) {
          const size = features.length
          const isOneFeature = size === 1

          const firstFeatureData: FeatureData = getFeatureData(features[0])

          let styleBySize = styleCache[size]
          let styleByType = styleCache[firstFeatureData.type]

          if (selectedFeature) {
            const selectedFeatures: Feature[] =
              getFeaturesWithin(selectedFeature)
            const selectedFeaturesSize = selectedFeatures.length

            if (selectedFeaturesSize) {
              if (selectedFeaturesSize === 1) {
                const selectedFeatureData: FeatureData = getFeatureData(
                  selectedFeatures[0],
                )

                if (firstFeatureData.id === selectedFeatureData.id) {
                  return getSelectedMarkerStyle(selectedFeatureData.type)
                }
              } else {
                const selectedFeaturesIds = selectedFeatures.map(
                  (f) => getFeatureData(f).id,
                )
                const featuresIds = features.map((f) => getFeatureData(f).id)

                if (
                  selectedFeaturesIds.every((id) => featuresIds.includes(id))
                ) {
                  const featuresCoords = getFeaturesCoordinate(
                    getFeaturesGeometry(selectedFeatures),
                  )

                  const isFeaturesHaveSameCoords =
                    checkFeaturesHaveSameCoords(featuresCoords)

                  if (isFeaturesHaveSameCoords) {
                    const featuresData = getFeaturesData(selectedFeatures)
                    const priorityTaskType = getPriorityTaskType(featuresData)
                    return getSelectedMarkerStyle(priorityTaskType)
                  }
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
            const featuresCoords = getFeaturesCoordinate(
              getFeaturesGeometry(features),
            )

            const isFeaturesHaveSameCoords =
              checkFeaturesHaveSameCoords(featuresCoords)

            if (isFeaturesHaveSameCoords) {
              const featuresData = getFeaturesData(features)
              const priorityTaskType = getPriorityTaskType(featuresData)
              return getMarkerStyle(priorityTaskType)
            }

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
          getGeometriesExtent(getFeaturesGeometry(features)),
        )

        fitMapToExtent(mapRef.current, extent)
      }
    }
  }, [tasks, featuresLayer])

  return <MapWrapperStyled ref={mapWrapperRef} />
}

export default TaskListMap
