import { WorkTypeApiEnum } from 'features/warehouse/constants/workType'
import { GetWorkTypesQueryArgs, GetWorkTypesSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const workTypeApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getWorkTypes: build.query<GetWorkTypesSuccessResponse, MaybeUndefined<GetWorkTypesQueryArgs>>({
      query: (params) => ({
        url: WorkTypeApiEnum.GetWorkTypes,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetWorkTypesQuery } = workTypeApiService
