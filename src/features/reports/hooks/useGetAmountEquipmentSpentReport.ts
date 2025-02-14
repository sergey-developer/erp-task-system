import { getAmountEquipmentSpentReportErrMsg } from 'features/reports/api/constants'
import { useGetAmountEquipmentSpentReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetAmountEquipmentSpentReportRequest } from 'features/reports/api/schemas'
import { GetAmountEquipmentSpentReportTransformedResponse } from 'features/reports/api/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetAmountEquipmentSpentReportResult = CustomUseQueryHookResult<
  GetAmountEquipmentSpentReportRequest,
  GetAmountEquipmentSpentReportTransformedResponse
>

type UseGetAmountEquipmentSpentReportOptions = CustomUseQueryOptions<
  GetAmountEquipmentSpentReportRequest,
  GetAmountEquipmentSpentReportTransformedResponse
>

export const useGetAmountEquipmentSpentReport = (
  args: GetAmountEquipmentSpentReportRequest,
  options?: UseGetAmountEquipmentSpentReportOptions,
): UseGetAmountEquipmentSpentReportResult => {
  const state = useGetAmountEquipmentSpentReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getAmountEquipmentSpentReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
