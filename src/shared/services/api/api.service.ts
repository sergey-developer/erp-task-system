import { createApi } from '@reduxjs/toolkit/query/react'

import baseQuery from './baseQuery'

const api = createApi({
  baseQuery: baseQuery({}),
  endpoints: () => ({}),
})

export default api
