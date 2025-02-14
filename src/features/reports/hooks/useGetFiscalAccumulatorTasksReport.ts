import { getFiscalAccumulatorTasksReportErrMsg } from 'features/reports/api/constants'
import { useGetFiscalAccumulatorTasksReportQuery } from 'features/reports/api/endpoints/fiscalAccumulator.endpoints'
import {
  GetFiscalAccumulatorTasksReportRequest,
  GetFiscalAccumulatorTasksReportResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorTasksResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFiscalAccumulatorTasksReportRequest>,
  GetFiscalAccumulatorTasksReportResponse
>

type UseGetFiscalAccumulatorTasksReportOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFiscalAccumulatorTasksReportRequest>,
  GetFiscalAccumulatorTasksReportResponse
>

export const useGetFiscalAccumulatorTasksReport = (
  args?: GetFiscalAccumulatorTasksReportRequest,
  options?: UseGetFiscalAccumulatorTasksReportOptions,
): UseGetFiscalAccumulatorTasksResult => {
  const state = useGetFiscalAccumulatorTasksReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getFiscalAccumulatorTasksReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
