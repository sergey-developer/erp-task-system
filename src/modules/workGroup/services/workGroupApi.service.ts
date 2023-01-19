import { WorkGroupEndpointsEnum } from 'modules/workGroup/constants/api'
import {
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse,
} from 'modules/workGroup/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const workGroupApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkGroupList: build.query<
      GetWorkGroupListSuccessResponse,
      GetWorkGroupListQueryArgs
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
