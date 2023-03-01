import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import {
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse,
} from 'modules/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { apiService } from 'shared/services/api'

const workGroupApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<
      GetWorkGroupListSuccessResponse,
      MaybeUndefined<GetWorkGroupListQueryArgs>
    >({
      query: (filter) => ({
        url: WorkGroupEndpointsEnum.WorkGroupList,
        method: HttpMethodEnum.Get,
        params: filter,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupListQuery } = workGroupApiService
