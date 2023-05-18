import { createApi } from '@reduxjs/toolkit/query/react'

import { TaskEndpointTagEnum } from 'modules/task/constants/api'

import { HttpMethodEnum } from 'shared/constants/http'

import baseQueryWithReauth from './baseQueryWithReauth'
import { BaseApiEnum, CACHE_TIME_LIFE } from './constants'
import {
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from './models'

export const baseApiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  tagTypes: [TaskEndpointTagEnum.Task, TaskEndpointTagEnum.TaskList],
  endpoints: (build) => ({
    getTimeZoneList: build.query<
      GetTimeZoneListSuccessResponse,
      GetTimeZoneListQueryArgs
    >({
      query: () => ({
        url: BaseApiEnum.GetTimeZoneList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetTimeZoneListQuery, endpoints: baseApiEndpoints } =
  baseApiService
