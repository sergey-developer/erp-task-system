import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupApiEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsQueryArgs, GetWorkGroupsSuccessResponse } from 'shared/workGroups/api/models'

const workGroupsEndpoints = baseApi.injectEndpoints({
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

export const { useGetWorkGroupsQuery } = workGroupsEndpoints
