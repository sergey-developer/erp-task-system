import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { env } from 'configs/env'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.get<string>('apiUrl'),
  }),
  endpoints: () => ({}),
})

export default api
