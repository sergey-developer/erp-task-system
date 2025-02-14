import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { SystemEndpointsEnum } from 'shared/system/api/constants/endpoints'
import {
  GetSystemInfoRequest,
  GetSystemInfoResponse,
} from 'shared/system/api/dto/systemInfo'
import {
  GetSystemSettingsRequest,
  GetSystemSettingsResponse,
} from 'shared/system/api/dto/systemSettings'

const systemEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSystemInfo: build.query<GetSystemInfoResponse, GetSystemInfoRequest>({
      query: () => ({
        url: SystemEndpointsEnum.GetSystemInfo,
        method: HttpMethodEnum.Get,
      }),
    }),
    getSystemSettings: build.query<GetSystemSettingsResponse, GetSystemSettingsRequest>({
      query: () => ({
        url: SystemEndpointsEnum.GetSystemSettings,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetSystemInfoQuery, useGetSystemSettingsQuery, endpoints } = systemEndpoints
