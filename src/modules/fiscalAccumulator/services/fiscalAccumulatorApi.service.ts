import { FiscalAccumulatorApiEnum } from 'modules/fiscalAccumulator/constants'
import {
  GetFiscalAccumulatorTasksQueryArgs,
  GetFiscalAccumulatorTasksSuccessResponse,
} from 'modules/fiscalAccumulator/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const fiscalAccumulatorApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulatorTasks: build.query<
      GetFiscalAccumulatorTasksSuccessResponse,
      MaybeUndefined<GetFiscalAccumulatorTasksQueryArgs>
    >({
      query: (params) => ({
        url: FiscalAccumulatorApiEnum.GetFiscalAccumulatorTasks,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetFiscalAccumulatorTasksQuery } = fiscalAccumulatorApiService
