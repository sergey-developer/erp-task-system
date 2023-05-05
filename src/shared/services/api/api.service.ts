import { createApi } from '@reduxjs/toolkit/query/react'

import { HttpMethodEnum } from 'shared/constants/http'

import baseQueryWithReauth from './baseQueryWithReauth'
import { BaseApiEnum, CACHE_TIME_LIFE } from './constants'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from './models'

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  endpoints: (build) => ({
    getTimeZoneList: build.query<
      GetTimeZoneListSuccessResponse,
      GetTimeZoneListQueryArgs
    >({
      query: () => ({
        url: BaseApiEnum.GetTimeZones,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTimeZoneListQuery, endpoints: baseApiEndpoints } =
  apiService
