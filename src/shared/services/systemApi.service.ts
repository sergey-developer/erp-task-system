import { HttpMethodEnum } from 'shared/constants/http'
import { SystemApiEnum } from 'shared/constants/system'
import { GetSystemInfoQueryArgs, GetSystemInfoSuccessResponse } from 'shared/models'

import { baseApiService } from './baseApi'

export const systemApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getSystemInfo: build.query<GetSystemInfoSuccessResponse, GetSystemInfoQueryArgs>({
      query: () => ({
        url: SystemApiEnum.GetSystemInfo,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetSystemInfoQuery, endpoints } = systemApiService
