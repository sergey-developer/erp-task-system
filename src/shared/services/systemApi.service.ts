import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiEnum } from 'shared/constants/system'
import {
  GetSystemInfoQueryArgs,
  GetSystemInfoSuccessResponse,
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse,
} from 'shared/models/system'

import { baseApiService } from './baseApi'

export const systemApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getSystemInfo: build.query<GetSystemInfoSuccessResponse, GetSystemInfoQueryArgs>({
      query: () => ({
        url: SystemApiEnum.GetSystemInfo,
        method: HttpMethodEnum.Get,
      }),
    }),
    getSystemSettings: build.query<GetSystemSettingsSuccessResponse, GetSystemSettingsQueryArgs>({
      query: () => ({
        url: SystemApiEnum.GetSystemSettings,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetSystemInfoQuery, useGetSystemSettingsQuery, endpoints } = systemApiService
