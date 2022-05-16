import { createApi } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'

const apiV1 = createApi({
  baseQuery: baseQuery({ apiPath: '/api', apiVersion: '/v1' }),
  endpoints: () => ({}),
})

export default apiV1
