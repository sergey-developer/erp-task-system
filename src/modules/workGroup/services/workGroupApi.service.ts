import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import {
  GetWorkGroupListQueryArgsModel,
  GetWorkGroupListResponseModel,
} from 'modules/workGroup/features/WorkGroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const workGroupApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<
      GetWorkGroupListResponseModel,
      GetWorkGroupListQueryArgsModel
    >({
      query: () => ({
        url: WorkGroupEndpointsEnum.WorkGroupList,
        method: HttpMethodEnum.Get,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkGroupListQuery } = workGroupApiService
