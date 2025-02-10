import { getSupportGroupsMtsrReportErrMsg } from 'features/reports/api/constants'
import { useGetSupportGroupsMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetSupportGroupsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportSuccessResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSupportGroupsMtsrReportResult = CustomUseQueryHookResult<
  GetSupportGroupsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportSuccessResponse
>

type UseGetSupportGroupsMtsrReportOptions = CustomUseQueryOptions<
  GetSupportGroupsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportSuccessResponse
>

export const useGetSupportGroupsMtsrReport = (
  args: GetSupportGroupsMtsrReportQueryArgs,
  options?: UseGetSupportGroupsMtsrReportOptions,
): UseGetSupportGroupsMtsrReportResult => {
  const state = useGetSupportGroupsMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getSupportGroupsMtsrReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
