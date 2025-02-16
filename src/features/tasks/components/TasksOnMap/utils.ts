import isEqual from 'lodash/isEqual'
import { Feature } from 'ol'
import { FeatureLike } from 'ol/Feature'
import OlMap from 'ol/Map'
import { Coordinate } from 'ol/coordinate'
import { Extent } from 'ol/extent'
import { Circle, Fill, Style, Text } from 'ol/style'

import { TaskTypeEnum } from 'features/tasks/api/constants'

import { isTruthy } from 'shared/utils/common'

import theme from 'styles/theme'

import {
  incidentMarkerStyle,
  incidentTaskOrRequestTaskMarkerStyle,
  requestMarkerStyle,
  selectedIncidentMarkerStyle,
  selectedIncidentTaskOrRequestTaskMarkerStyle,
  selectedRequestMarkerStyle,
} from './styles'
import { FeatureData, Geometry } from './types'

export const formatCoords = (coords: Coordinate, maxFractionDigits = 8) =>
  coords.map((c) =>
    Number(
      c.toLocaleString('en-EN', {
        maximumFractionDigits: maxFractionDigits,
      }),
    ),
  )

export const getFeaturesGeometry = (
  features: Feature[],
): (Geometry & { getCoordinates: () => Coordinate })[] =>
  features
    .map((f) => f.getGeometry() as Geometry & { getCoordinates: () => Coordinate })
    .filter(isTruthy)

export const getFeaturesCoordinate = (geometries: Geometry[]): Coordinate[] =>
  geometries.map((g) => g.getCoordinates())

export const getGeometriesExtent = (geometries: Geometry[]): Extent[] =>
  geometries.map((g) => g.getExtent())

export const fitMapToExtent = (map: OlMap, extent: Extent): void => {
  if (extent.length) {
    map.getView().fit(extent, { duration: 1000, padding: [100, 100, 100, 100] })
  }
}

export const checkFeaturesHaveSameCoords = (coords: Coordinate[]): boolean =>
  coords.every((coords, index, array) => array.every((c) => isEqual(c, coords)))

export const getFeaturesData = (features: Feature[]): FeatureData[] =>
  features.map((f) => f.get('data'))

export const getFeatureData = (feature: Feature): FeatureData => feature.get('data')

export const getFeaturesWithin = (feature: Feature | FeatureLike): Feature[] =>
  feature.get('features')

export const getPriorityTaskType = (featuresData: FeatureData[]): FeatureData['type'] => {
  let type: TaskTypeEnum

  const incident = featuresData.find(({ type }) => type === TaskTypeEnum.Incident)
  const request = featuresData.find(({ type }) => type === TaskTypeEnum.Request)

  if (incident) {
    type = incident.type
  } else if (request) {
    type = request.type
  } else {
    type = TaskTypeEnum.IncidentTask
  }

  return type
}

export const getClusterStyle = (size: number): Style =>
  new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: theme.colors.fireOpal,
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
