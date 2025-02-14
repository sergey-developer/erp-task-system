import { getMacroregionsMtsrReportErrorMessage } from 'features/reports/api/constants'
import { useGetMacroregionsMtsrReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import {
  GetMacroregionsMtsrReportRequest,
  GetMacroregionsMtsrReportResponse,
} from 'features/reports/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetMacroregionsMtsrReportResult = CustomUseQueryHookResult<
  GetMacroregionsMtsrReportRequest,
  GetMacroregionsMtsrReportResponse
>

type UseGetMacroregionsMtsrReportOptions = CustomUseQueryOptions<
  GetMacroregionsMtsrReportRequest,
  GetMacroregionsMtsrReportResponse
>

export const useGetMacroregionsMtsrReport = (
  args: GetMacroregionsMtsrReportRequest,
  options?: UseGetMacroregionsMtsrReportOptions,
): UseGetMacroregionsMtsrReportResult => {
  const state = useGetMacroregionsMtsrReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getMacroregionsMtsrReportErrorMessage)
      }
    }
  }, [state.error])

  return state
}
