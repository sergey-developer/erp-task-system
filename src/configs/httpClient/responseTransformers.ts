import { AxiosResponseTransformer } from 'axios'
import { camelize } from 'humps'

import { hasJsonContentType } from './utils'

const fromJsonTransformer: AxiosResponseTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? JSON.parse(data) : data
}

const fromSnakeCaseTransformer: AxiosResponseTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? camelize(data) : data
}

export { fromJsonTransformer, fromSnakeCaseTransformer }
