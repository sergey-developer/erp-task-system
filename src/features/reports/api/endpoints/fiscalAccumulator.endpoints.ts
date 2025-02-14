import { ReportsApiPathsEnum } from 'features/reports/api/constants'
import {
  GetFiscalAccumulatorTasksReportRequest,
  GetFiscalAccumulatorTasksReportResponse,
} from 'features/reports/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const fiscalAccumulatorEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulatorTasksReport: build.query<
      GetFiscalAccumulatorTasksReportResponse,
      MaybeUndefined<GetFiscalAccumulatorTasksReportRequest>
    >({
      query: (params) => ({
        url: ReportsApiPathsEnum.GetFiscalAccumulatorTasksReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetFiscalAccumulatorTasksReportQuery } = fiscalAccumulatorEndpoints
