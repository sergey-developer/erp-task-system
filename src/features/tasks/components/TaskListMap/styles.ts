import { Icon, Style } from 'ol/style'
import { Options as IconOptions } from 'ol/style/Icon'
import styled from 'styled-components'

import IncidentMarkerIcon from 'assets/icons/task/map-marker-type-incident.svg'
import RequestMarkerIcon from 'assets/icons/task/map-marker-type-request.svg'
import TaskMarkerIcon from 'assets/icons/task/map-marker-type-task.svg'
import SelectedIncidentMarkerIcon from 'assets/icons/task/selected-map-marker-type-incident.svg'
import SelectedRequestMarkerIcon from 'assets/icons/task/selected-map-marker-type-request.svg'
import SelectedTaskMarkerIcon from 'assets/icons/task/selected-map-marker-type-task.svg'

export const MapWrapperStyled = styled.div`
  width: 100%;
  // todo: stretch to parent height
  height: 900px;
`

const markerIconOptions: IconOptions = {
  size: [24, 24],
}

export const incidentMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    src: IncidentMarkerIcon,
  }),
})

export const requestMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    src: RequestMarkerIcon,
  }),
})

export const incidentTaskOrRequestTaskMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    src: TaskMarkerIcon,
  }),
})

const selectedMarkerIconOptions: IconOptions = {
  size: [48, 48],
}

export const selectedIncidentMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    src: SelectedIncidentMarkerIcon,
  }),
})

export const selectedRequestMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    src: SelectedRequestMarkerIcon,
  }),
})

export const selectedIncidentTaskOrRequestTaskMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    src: SelectedTaskMarkerIcon,
  }),
})
