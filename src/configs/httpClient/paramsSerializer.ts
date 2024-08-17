import { decamelizeKeys } from 'humps'
import qs from 'qs'

const paramsSerializer = (params: object): string => {
  return qs.stringify(decamelizeKeys(params), { arrayFormat: 'repeat', skipNulls: false })
}

export default paramsSerializer
