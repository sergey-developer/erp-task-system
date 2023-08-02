import { Coordinate } from 'ol/coordinate'
import { Circle, Fill, Style, Text } from 'ol/style'

import { TaskTypeEnum } from 'modules/task/constants'

import {
  incidentMarkerColor,
  incidentMarkerStyle,
  incidentTaskOrRequestTaskMarkerStyle,
  requestMarkerStyle,
  selectedIncidentMarkerStyle,
  selectedIncidentTaskOrRequestTaskMarkerStyle,
  selectedRequestMarkerStyle,
} from './styles'

export const formatCoords = (coords: Coordinate, maxFractionDigits = 8) => [
  Number(
    coords[0].toLocaleString(undefined, {
      maximumFractionDigits: maxFractionDigits,
    }),
  ),
  Number(
    coords[1].toLocaleString(undefined, {
      maximumFractionDigits: maxFractionDigits,
    }),
  ),
]

export const getClusterStyle = (size: number): Style =>
  new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: incidentMarkerColor,
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

export const styleCache: Partial<Record<number | TaskTypeEnum, Style>> = {}
