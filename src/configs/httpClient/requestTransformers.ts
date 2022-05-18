import { AxiosRequestTransformer } from 'axios'
import { decamelizeKeys } from 'humps'

import { hasJsonContentType } from './utils'

const toJsonTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? JSON.stringify(data) : data
}

const toSnakeCaseTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) && data ? decamelizeKeys(data) : data
}

export { toJsonTransformer, toSnakeCaseTransformer }
