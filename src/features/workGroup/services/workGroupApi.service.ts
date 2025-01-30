import { WorkGroupApiEnum } from 'features/workGroup/constants'
import { GetWorkGroupsQueryArgs, GetWorkGroupsSuccessResponse } from 'features/workGroup/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'

const workGroupApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroups: build.query<GetWorkGroupsSuccessResponse, GetWorkGroupsQueryArgs>({
      query: (params) => ({
        url: WorkGroupApiEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupsQuery } = workGroupApiService
