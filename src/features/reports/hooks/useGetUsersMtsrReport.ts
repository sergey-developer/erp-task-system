import { getUsersMtsrReportErrMsg } from 'features/reports/api/constants'
import { useGetUsersMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetUsersMtsrReportRequest,
  GetUsersMtsrReportResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersMtsrReportResult = CustomUseQueryHookResult<
  GetUsersMtsrReportRequest,
  GetUsersMtsrReportResponse
>

type UseGetUsersMtsrReportOptions = CustomUseQueryOptions<
  GetUsersMtsrReportRequest,
  GetUsersMtsrReportResponse
>

export const useGetUsersMtsrReport = (
  args: GetUsersMtsrReportRequest,
  options?: UseGetUsersMtsrReportOptions,
): UseGetUsersMtsrReportResult => {
  const state = useGetUsersMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getUsersMtsrReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
