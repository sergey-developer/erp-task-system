import { getWorkGroupsMtsrReportErrMsg } from 'features/reports/api/constants'
import { useGetWorkGroupsMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetWorkGroupsMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportSuccessResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkGroupsMtsrReportResult = CustomUseQueryHookResult<
  GetWorkGroupsMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportSuccessResponse
>

type UseGetWorkGroupsMtsrReportOptions = CustomUseQueryOptions<
  GetWorkGroupsMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportSuccessResponse
>

export const useGetWorkGroupsMtsrReport = (
  args: GetWorkGroupsMtsrReportQueryArgs,
  options?: UseGetWorkGroupsMtsrReportOptions,
): UseGetWorkGroupsMtsrReportResult => {
  const state = useGetWorkGroupsMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWorkGroupsMtsrReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
