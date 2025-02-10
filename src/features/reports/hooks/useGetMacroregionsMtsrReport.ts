import { getMacroregionsMtsrReportErrMsg } from 'features/reports/api/constants'
import { useGetMacroregionsMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetMacroregionsMtsrReportQueryArgs,
  GetMacroregionsMtsrReportSuccessResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMacroregionsMtsrReportResult = CustomUseQueryHookResult<
  GetMacroregionsMtsrReportQueryArgs,
  GetMacroregionsMtsrReportSuccessResponse
>

type UseGetMacroregionsMtsrReportOptions = CustomUseQueryOptions<
  GetMacroregionsMtsrReportQueryArgs,
  GetMacroregionsMtsrReportSuccessResponse
>

export const useGetMacroregionsMtsrReport = (
  args: GetMacroregionsMtsrReportQueryArgs,
  options?: UseGetMacroregionsMtsrReportOptions,
): UseGetMacroregionsMtsrReportResult => {
  const state = useGetMacroregionsMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getMacroregionsMtsrReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
