import { getSupportGroupsMtsrReportErrorMessage } from 'features/reports/api/constants'
import { useGetSupportGroupsMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetSupportGroupsMtsrReportRequest,
  GetSupportGroupsMtsrReportResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSupportGroupsMtsrReportResult = CustomUseQueryHookResult<
  GetSupportGroupsMtsrReportRequest,
  GetSupportGroupsMtsrReportResponse
>

type UseGetSupportGroupsMtsrReportOptions = CustomUseQueryOptions<
  GetSupportGroupsMtsrReportRequest,
  GetSupportGroupsMtsrReportResponse
>

export const useGetSupportGroupsMtsrReport = (
  args: GetSupportGroupsMtsrReportRequest,
  options?: UseGetSupportGroupsMtsrReportOptions,
): UseGetSupportGroupsMtsrReportResult => {
  const state = useGetSupportGroupsMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getSupportGroupsMtsrReportErrorMessage)
      }
    }
  }, [state.error])

  return state
}
