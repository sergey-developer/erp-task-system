import { AxiosRequestHeaders } from 'axios'

import { MaybeUndefined } from 'shared/interfaces/utils'

const getContentType = (headers: MaybeUndefined<AxiosRequestHeaders>) => {
  return headers ? headers['Content-Type'] || headers['content-type'] : ''
}

export default getContentType
