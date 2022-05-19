import { createApi } from '@reduxjs/toolkit/query/react'

import baseQueryWithReauth from './baseQueryWithReauth'
import { CACHE_TIME } from './constants'

const apiV1 = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME,
  endpoints: (build) => ({
    testRetrieve: build.query<unknown, void>({
      query: () => ({ url: '/test/' }),
    }),
  }),
})

export default apiV1
export const { useLazyTestRetrieveQuery } = apiV1
