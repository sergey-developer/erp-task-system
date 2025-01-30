import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUsersMtsrReportErrMsg } from 'features/reports/constants'
import {
  GetUsersMtsrReportQueryArgs,
  GetUsersMtsrReportSuccessResponse,
} from 'features/reports/models'
import { useGetUsersMtsrReportQuery } from 'features/reports/services/reportsApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersMtsrReportResult = CustomUseQueryHookResult<
  GetUsersMtsrReportQueryArgs,
  GetUsersMtsrReportSuccessResponse
>

type UseGetUsersMtsrReportOptions = CustomUseQueryOptions<
  GetUsersMtsrReportQueryArgs,
  GetUsersMtsrReportSuccessResponse
>

export const useGetUsersMtsrReport = (
  args: GetUsersMtsrReportQueryArgs,
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
