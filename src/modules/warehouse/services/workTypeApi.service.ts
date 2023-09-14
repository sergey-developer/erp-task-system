import { WorkTypeApiEnum } from 'modules/warehouse/constants/workType'
import { GetWorkTypeListQueryArgs, GetWorkTypeListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const workTypeApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypeList: build.query<GetWorkTypeListSuccessResponse, GetWorkTypeListQueryArgs>({
      query: () => ({
        url: WorkTypeApiEnum.GetWorkTypeList,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkTypeListQuery } = workTypeApiService
