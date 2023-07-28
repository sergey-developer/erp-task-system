import { Icon, Style } from 'ol/style'
import { Options as IconOptions } from 'ol/style/Icon'
import styled from 'styled-components'

import SelectedMarkerIcon from 'assets/icons/task-map-marker-lg.svg'
import DefaultMarkerIcon from 'assets/icons/task-map-marker-sm.svg'

import theme from 'styles/theme'

export const MapWrapperStyled = styled.div`
  width: 100%;
  // todo: stretch to parent height
  height: 900px;
`

export const incidentMarkerColor = theme.colors.fireOpal
export const requestMarkerColor = '#5792EB'
export const incidentTaskOrRequestTaskMarkerColor = '#FAAD14'

const markerIconOptions: IconOptions = {
  src: DefaultMarkerIcon,
  size: [24, 24],
}

export const incidentMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    color: incidentMarkerColor,
  }),
})

export const requestMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    color: requestMarkerColor,
  }),
})

export const incidentTaskOrRequestTaskMarkerStyle = new Style({
  image: new Icon({
    ...markerIconOptions,
    color: incidentTaskOrRequestTaskMarkerColor,
  }),
})

const selectedMarkerIconOptions: IconOptions = {
  src: SelectedMarkerIcon,
  size: [48, 48],
}

export const selectedClusterStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    color: incidentMarkerColor,
  }),
})

export const selectedIncidentMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    color: incidentMarkerColor,
  }),
})

export const selectedRequestMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    color: requestMarkerColor,
  }),
})

export const selectedIncidentTaskOrRequestTaskMarkerStyle = new Style({
  image: new Icon({
    ...selectedMarkerIconOptions,
    color: incidentTaskOrRequestTaskMarkerColor,
  }),
})
