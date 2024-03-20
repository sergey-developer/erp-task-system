import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkGroupsMtsrReportErrMsg } from 'modules/reports/constants'
import {
  GetWorkGroupsMtsrReportQueryArgs,
  GetWorkGroupsMtsrReportSuccessResponse,
} from 'modules/reports/models'
import { useGetWorkGroupsMtsrReportQuery } from 'modules/reports/services/reportsApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
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
