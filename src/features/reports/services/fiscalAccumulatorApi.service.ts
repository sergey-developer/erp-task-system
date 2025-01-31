import { ReportsApiEnum } from 'features/reports/constants'
import {
  GetFiscalAccumulatorTasksReportQueryArgs,
  GetFiscalAccumulatorTasksReportSuccessResponse,
} from 'features/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApi } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const fiscalAccumulatorApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulatorTasksReport: build.query<
      GetFiscalAccumulatorTasksReportSuccessResponse,
      MaybeUndefined<GetFiscalAccumulatorTasksReportQueryArgs>
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

export const { useGetFiscalAccumulatorTasksReportQuery } = fiscalAccumulatorApiService
