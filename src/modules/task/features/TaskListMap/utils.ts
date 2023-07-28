import { Feature } from 'ol'
import { FeatureLike } from 'ol/Feature'
import { Circle, Fill, Style, Text } from 'ol/style'

import { TaskTypeEnum } from 'modules/task/constants'

import { FeatureData } from './interfaces'
import {
  incidentMarkerStyle,
  incidentTaskOrRequestTaskMarkerStyle,
  requestMarkerStyle,
  selectedIncidentMarkerStyle,
  selectedIncidentTaskOrRequestTaskMarkerStyle,
  selectedRequestMarkerStyle,
} from './styles'

export const getClusterMarkerStyle = (size: number): Style =>
  new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: '#EB5757',
      }),
    }),
    text: new Text({
      text: size.toString(),
      fill: new Fill({
        color: '#fff',
      }),
    }),
  })

export const getMarkerStyle = (type: TaskTypeEnum): Style => {
  switch (type) {
    case TaskTypeEnum.Incident:
      return incidentMarkerStyle
    case TaskTypeEnum.Request:
      return requestMarkerStyle
    case TaskTypeEnum.IncidentTask:
    case TaskTypeEnum.RequestTask:
      return incidentTaskOrRequestTaskMarkerStyle
  }
}

export const getSelectedMarkerStyle = (type: TaskTypeEnum): Style => {
  switch (type) {
    case TaskTypeEnum.Incident:
      return selectedIncidentMarkerStyle
    case TaskTypeEnum.Request:
      return selectedRequestMarkerStyle
    case TaskTypeEnum.IncidentTask:
    case TaskTypeEnum.RequestTask:
      return selectedIncidentTaskOrRequestTaskMarkerStyle
  }
}

const styleCache: Partial<Record<number | TaskTypeEnum, Style>> = {}

export const setFeaturesLayerStyleFn =
  (selectedFeature?: Feature) => (feature: FeatureLike) => {
    const features = feature.get('features') as Feature[]

    if (features.length) {
      const size = features.length
      const isOneFeature = size === 1

      const firstFeatureData: FeatureData = features[0].get('data')

      let styleBySize = styleCache[size]
      let styleByType = styleCache[firstFeatureData.type]

      if (isOneFeature && selectedFeature) {
        const selectedFeatureData: FeatureData = selectedFeature.get('data')

        if (firstFeatureData?.id === selectedFeatureData?.id) {
          return selectedFeature.getStyle() as Style
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
          styleBySize = getClusterMarkerStyle(size)
          styleCache[size] = styleBySize
        }

        return styleBySize
      }
    }
  }
