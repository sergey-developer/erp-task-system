import { createApi } from '@reduxjs/toolkit/query/react'

import { env } from 'configs/env'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME_LIFE } from './constants'

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnFocus: env.isProduction,
  refetchOnReconnect: env.isProduction,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  endpoints: () => ({}),
})
