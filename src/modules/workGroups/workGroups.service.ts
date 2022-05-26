import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

import { GetWorkGroupListResponseModel } from './models'

const workGroupsService = api.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<GetWorkGroupListResponseModel, null>({
      query: () => ({
        url: '/work-groups',
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export { workGroupsService }

export const { useGetWorkGroupListQuery } = workGroupsService
