import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getFiscalAccumulatorTasksReportErrMsg } from 'features/reports/constants'
import {
  GetFiscalAccumulatorTasksReportQueryArgs,
  GetFiscalAccumulatorTasksReportSuccessResponse,
} from 'features/reports/models'
import { useGetFiscalAccumulatorTasksReportQuery } from 'features/reports/services/fiscalAccumulatorApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetFiscalAccumulatorTasksResult = CustomUseQueryHookResult<
  MaybeUndefined<GetFiscalAccumulatorTasksReportQueryArgs>,
  GetFiscalAccumulatorTasksReportSuccessResponse
>

type UseGetFiscalAccumulatorTasksReportOptions = CustomUseQueryOptions<
  MaybeUndefined<GetFiscalAccumulatorTasksReportQueryArgs>,
  GetFiscalAccumulatorTasksReportSuccessResponse
>

export const useGetFiscalAccumulatorTasksReport = (
  args?: GetFiscalAccumulatorTasksReportQueryArgs,
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
