import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { WorkGroupsApiPathsEnum } from 'shared/workGroups/api/constants'
import { GetWorkGroupsRequest, GetWorkGroupsResponse } from 'shared/workGroups/api/schemas'

const workGroupsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroups: build.query<GetWorkGroupsResponse, GetWorkGroupsRequest>({
      query: (params) => ({
        url: WorkGroupsApiPathsEnum.GetWorkGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWorkGroupsQuery } = workGroupsEndpoints
