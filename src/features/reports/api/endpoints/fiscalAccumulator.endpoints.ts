import { ReportsEndpointsEnum } from 'features/reports/api/constants'
import {
  GetFiscalAccumulatorTasksReportQueryArgs,
  GetFiscalAccumulatorTasksReportSuccessResponse,
} from 'features/reports/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const fiscalAccumulatorEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFiscalAccumulatorTasksReport: build.query<
      GetFiscalAccumulatorTasksReportSuccessResponse,
      MaybeUndefined<GetFiscalAccumulatorTasksReportQueryArgs>
    >({
      query: (params) => ({
        url: ReportsEndpointsEnum.GetFiscalAccumulatorTasksReport,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
  }),
})

export const { useGetFiscalAccumulatorTasksReportQuery } = fiscalAccumulatorEndpoints
