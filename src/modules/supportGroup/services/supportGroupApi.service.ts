import { SupportGroupApiEnum } from 'modules/supportGroup/constants'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'
import { MaybeUndefined } from 'shared/types/utils'

import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from '../models'

const supportGroupApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getSupportGroupList: build.query<
      GetSupportGroupListSuccessResponse,
      MaybeUndefined<GetSupportGroupListQueryArgs>
    >({
      query: () => ({
        url: SupportGroupApiEnum.GetSupportGroupList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSupportGroupListQuery } = supportGroupApiService
