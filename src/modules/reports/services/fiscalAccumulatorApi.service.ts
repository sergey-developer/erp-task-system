import { ReportsApiEnum } from 'modules/reports/constants'
import {
  GetFiscalAccumulatorTasksQueryArgs,
  GetFiscalAccumulatorTasksSuccessResponse,
} from 'modules/reports/models'

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
        url: ReportsApiEnum.GetFiscalAccumulatorTasksReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetFiscalAccumulatorTasksQuery } = fiscalAccumulatorApiService
