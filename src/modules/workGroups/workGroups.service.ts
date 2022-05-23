import MethodEnums from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetWorkGroupListResponse } from './interfaces'

const workGroupsService = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<GetWorkGroupListResponse, null>({
      query: () => ({
        url: '/work-groups',
        method: MethodEnums.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { workGroupsService }

export const { useGetWorkGroupListQuery } = workGroupsService
