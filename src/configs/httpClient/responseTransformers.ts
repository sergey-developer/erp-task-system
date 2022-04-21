import { AxiosResponseTransformer } from 'axios'

import { getContentType, isJsonContentType } from './utils'

const fromJsonTransformer: AxiosResponseTransformer = (data, headers) => {
  const contentType = getContentType(headers) as string
  return isJsonContentType(contentType) ? JSON.parse(data) : data
}

export { fromJsonTransformer }
