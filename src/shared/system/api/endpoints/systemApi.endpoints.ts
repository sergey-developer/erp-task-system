import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { SystemEndpointsEnum } from 'shared/system/api/constants/endpoints'
import {
  GetSystemInfoQueryArgs,
  GetSystemInfoSuccessResponse,
} from 'shared/system/api/dto/systemInfo'
import {
  GetSystemSettingsQueryArgs,
  GetSystemSettingsSuccessResponse,
} from 'shared/system/api/dto/systemSettings'

const systemEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSystemInfo: build.query<GetSystemInfoSuccessResponse, GetSystemInfoQueryArgs>({
      query: () => ({
        url: SystemEndpointsEnum.GetSystemInfo,
        method: HttpMethodEnum.Get,
      }),
    }),
    getSystemSettings: build.query<GetSystemSettingsSuccessResponse, GetSystemSettingsQueryArgs>({
      query: () => ({
        url: SystemEndpointsEnum.GetSystemSettings,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetSystemInfoQuery, useGetSystemSettingsQuery, endpoints } = systemEndpoints
