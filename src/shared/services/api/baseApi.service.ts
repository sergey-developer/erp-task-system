import { createApi } from '@reduxjs/toolkit/query/react'

import { TaskApiTagEnum } from 'modules/task/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import baseQueryWithReauth from './baseQueryWithReauth'
import { BaseApiEnum, CACHE_TIME_LIFE } from './constants'
import {
  GetSystemInfoQueryArgs,
  GetSystemInfoSuccessResponse,
  GetTimeZoneListQueryArgs,
  GetTimeZoneListSuccessResponse,
} from './models'

export const baseApiService = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: CACHE_TIME_LIFE,
  tagTypes: [TaskApiTagEnum.Task, TaskApiTagEnum.TaskList],
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
    getSystemInfo: build.query<
      GetSystemInfoSuccessResponse,
      GetSystemInfoQueryArgs
    >({
      query: () => ({
        url: BaseApiEnum.GetSystemInfo,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const {
  useGetTimeZoneListQuery,
  useGetSystemInfoQuery,
  endpoints: baseApiEndpoints,
} = baseApiService
