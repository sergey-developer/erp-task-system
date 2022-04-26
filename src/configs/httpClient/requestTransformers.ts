import { AxiosRequestTransformer } from 'axios'
import { decamelize } from 'humps'

import { hasJsonContentType } from './utils'

const toJsonTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? JSON.stringify(data) : data
}

const toSnakeCaseTransformer: AxiosRequestTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? decamelize(data) : data
}

export { toJsonTransformer, toSnakeCaseTransformer }
