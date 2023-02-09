import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  endpoints: () => ({}),
})

export default apiService
