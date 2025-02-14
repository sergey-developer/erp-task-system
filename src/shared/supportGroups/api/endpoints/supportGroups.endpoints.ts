import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { SupportGroupsEndpointsEnum } from 'shared/supportGroups/api/constants'
import {
  GetSupportGroupsRequest,
  GetSupportGroupsResponse,
} from 'shared/supportGroups/api/schemas'

const supportGroupsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSupportGroupList: build.query<GetSupportGroupsResponse, GetSupportGroupsRequest>({
      query: (params) => ({
        url: SupportGroupsEndpointsEnum.GetSupportGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetSupportGroupListQuery } = supportGroupsEndpoints
