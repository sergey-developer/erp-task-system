import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME } from './constants'

const apiV1 = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME,
  endpoints: () => ({}),
})

export default apiV1
