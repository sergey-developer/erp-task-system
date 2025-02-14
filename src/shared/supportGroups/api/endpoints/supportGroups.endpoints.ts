import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { SupportGroupsApiPathsEnum } from 'shared/supportGroups/api/constants'
import { GetSupportGroupsRequest, GetSupportGroupsResponse } from 'shared/supportGroups/api/schemas'

const supportGroupsEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSupportGroupList: build.query<GetSupportGroupsResponse, GetSupportGroupsRequest>({
      query: (params) => ({
        url: SupportGroupsApiPathsEnum.GetSupportGroups,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetSupportGroupListQuery } = supportGroupsEndpoints
