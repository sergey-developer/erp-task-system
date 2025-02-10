import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupsEndpointsEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsQueryArgs, GetWorkGroupsSuccessResponse } from 'shared/workGroups/api/schemas'

const workGroupsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroups: build.query<GetWorkGroupsSuccessResponse, GetWorkGroupsQueryArgs>({
      query: (params) => ({
        url: WorkGroupsEndpointsEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWorkGroupsQuery } = workGroupsEndpoints
