import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { baseApiService } from 'shared/services/api'

import { SupportGroupEndpointsEnum } from '../constants/api'
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
        url: SupportGroupEndpointsEnum.GetSupportGroupList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetSupportGroupListQuery } = supportGroupApiService
