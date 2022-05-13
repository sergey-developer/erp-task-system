import { AxiosRequestTransformer } from 'axios'
import { decamelize } from 'humps'

import { hasJsonContentType } from './utils'

const toJsonTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? JSON.stringify(data) : data
}

const toSnakeCaseTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) && data ? decamelize(data) : data
}

export { toJsonTransformer, toSnakeCaseTransformer }
