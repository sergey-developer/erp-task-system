import { AxiosRequestHeaders } from 'axios'
import _get from 'lodash/get'

import { MaybeUndefined } from 'shared/interfaces/utils'

const getContentType = (headers: MaybeUndefined<AxiosRequestHeaders>) => {
  return _get(headers, 'Content-Type', '') || _get(headers, 'content-type', '')
}

export default getContentType
