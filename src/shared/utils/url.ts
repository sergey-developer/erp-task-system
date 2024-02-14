import qs, { IStringifyOptions } from 'qs'
import { useLocation } from 'react-router-dom'

export const getPathByLocation = (location: ReturnType<typeof useLocation>): string =>
  location.search ? `${location.pathname}${location.search}` : location.pathname

export const getPathWithQs = <P>(path: string, qsObj: P, qsOptions?: IStringifyOptions): string =>
  `${path}${qs.stringify(qsObj, { addQueryPrefix: true, ...qsOptions })}`
