import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME } from './constants'
import { CustomBaseQueryFn } from './intefraces'

const apiV1 = createApi({
  baseQuery: baseQueryWithReauth as CustomBaseQueryFn,
  keepUnusedDataFor: CACHE_TIME,
  endpoints: () => ({}),
})

export default apiV1
