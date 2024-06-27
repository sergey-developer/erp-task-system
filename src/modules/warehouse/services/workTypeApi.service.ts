import { WorkTypeApiEnum } from 'modules/warehouse/constants/workType'
import { GetWorkTypesQueryArgs, GetWorkTypesSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const workTypeApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypes: build.query<GetWorkTypesSuccessResponse, GetWorkTypesQueryArgs>({
      query: () => ({
        url: WorkTypeApiEnum.GetWorkTypes,
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
})

export const { useGetWorkTypesQuery } = workTypeApiService
