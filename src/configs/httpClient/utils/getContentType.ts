import { AxiosRequestHeaders } from 'axios'
import get from 'lodash/get'

import { MaybeUndefined } from 'shared/types/utils'

const getContentType = (headers: MaybeUndefined<AxiosRequestHeaders>) => {
  return get(headers, 'Content-Type', '') || get(headers, 'content-type', '')
}

export default getContentType
