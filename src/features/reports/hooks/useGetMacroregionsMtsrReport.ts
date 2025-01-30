import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getMacroregionsMtsrReportErrMsg } from 'features/reports/constants'
import {
  GetMacroregionsMtsrReportQueryArgs,
  GetMacroregionsMtsrReportSuccessResponse,
} from 'features/reports/models'
import { useGetMacroregionsMtsrReportQuery } from 'features/reports/services/reportsApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
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
