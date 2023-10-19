import { SupportGroupApiEnum } from 'modules/supportGroup/constants'
import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from 'modules/supportGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
