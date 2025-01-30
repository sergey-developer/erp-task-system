import { SupportGroupApiEnum } from 'features/supportGroup/constants'
import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from 'features/supportGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

const supportGroupApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getSupportGroupList: build.query<
      GetSupportGroupListSuccessResponse,
      GetSupportGroupListQueryArgs
    >({
      query: (params) => ({
        url: SupportGroupApiEnum.GetSupportGroupList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSupportGroupListQuery } = supportGroupApiService
