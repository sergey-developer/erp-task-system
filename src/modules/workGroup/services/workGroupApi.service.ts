import { GetWorkGroupListResponseModel } from 'modules/workGroup/features/WorkGroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const workGroupApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<GetWorkGroupListResponseModel, null>({
      query: () => ({
        url: '/work-groups',
        method: HttpMethodEnum.GET,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupListQuery } = workGroupApiService
