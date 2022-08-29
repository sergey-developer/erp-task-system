import { WorkgroupEndpointsEnum } from 'modules/workgroup/constants/api'
import { GetWorkgroupListResponseModel } from 'modules/workgroup/features/WorkgroupList/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const workgroupApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkgroupList: build.query<GetWorkgroupListResponseModel, null>({
      query: () => ({
        url: WorkgroupEndpointsEnum.WorkgroupList,
        method: HttpMethodEnum.GET,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
  overrideExisting: false,
})

export const { useGetWorkgroupListQuery } = workgroupApiService
