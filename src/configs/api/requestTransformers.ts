import { AxiosRequestTransformer } from 'axios'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'

import { getContentType, isJsonContentType } from './utils'

const toJsonTransformer: AxiosRequestTransformer = (data, headers) => {
  const contentType = getContentType(headers) as string

  return isJsonContentType(contentType) &&
    (isPlainObject(data) || isArray(data))
    ? JSON.stringify(data)
    : data
}

export { toJsonTransformer }
