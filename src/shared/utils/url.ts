import { useLocation } from 'react-router-dom'

export const getUrlByLocation = (location: ReturnType<typeof useLocation>): string =>
  location.search ? `${location.pathname}${location.search}` : location.pathname
