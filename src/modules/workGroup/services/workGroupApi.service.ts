import { GetWorkGroupListResponseModel } from 'modules/workGroup/components/WorkGroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const workGroupApiService = api.injectEndpoints({
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
export default workGroupApiService
