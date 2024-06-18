import { AxiosResponseTransformer } from 'axios'
import { camelizeKeys } from 'humps'

import { isSnakeCaseUpperCase } from 'shared/utils/string'

import { hasJsonContentType } from './utils'

const fromJsonTransformer: AxiosResponseTransformer = (data, headers) => {
  return hasJsonContentType(headers) ? JSON.parse(data) : data
}

const fromSnakeCaseTransformer: AxiosResponseTransformer = (data, headers) => {
  return hasJsonContentType(headers)
    ? camelizeKeys(data, (key, convert, options) =>
        isSnakeCaseUpperCase(key) ? key : convert(key, options),
      )
    : data
}

export { fromJsonTransformer, fromSnakeCaseTransformer }
