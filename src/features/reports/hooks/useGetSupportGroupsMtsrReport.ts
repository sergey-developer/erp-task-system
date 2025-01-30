import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSupportGroupsMtsrReportErrMsg } from 'features/reports/constants'
import {
  GetSupportGroupsMtsrReportQueryArgs,
  GetSupportGroupsMtsrReportSuccessResponse,
} from 'features/reports/models'
import { useGetSupportGroupsMtsrReportQuery } from 'features/reports/services/reportsApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
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
