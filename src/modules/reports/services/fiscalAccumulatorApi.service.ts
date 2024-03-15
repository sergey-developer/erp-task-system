import { ReportsApiEnum } from 'modules/reports/constants'
import {
  GetFiscalAccumulatorTasksReportQueryArgs,
  GetFiscalAccumulatorTasksReportSuccessResponse,
} from 'modules/reports/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const fiscalAccumulatorApiService = baseApiService.injectEndpoints({
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
