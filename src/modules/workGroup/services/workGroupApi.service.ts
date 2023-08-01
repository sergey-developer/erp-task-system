import { WorkGroupApiEnum } from 'modules/workGroup/constants'
import {
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse,
} from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'
import { baseApiService } from 'shared/services/api'

const workGroupApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<
      GetWorkGroupListSuccessResponse,
      MaybeUndefined<GetWorkGroupListQueryArgs>
    >({
      query: (filter) => ({
        url: WorkGroupApiEnum.GetWorkGroupList,
        method: HttpMethodEnum.Get,
        params: filter,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupListQuery } = workGroupApiService
