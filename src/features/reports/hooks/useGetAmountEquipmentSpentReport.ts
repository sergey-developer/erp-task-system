import { getAmountEquipmentSpentReportErrMsg } from 'features/reports/api/constants'
import { useGetAmountEquipmentSpentReportQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetAmountEquipmentSpentReportQueryArgs } from 'features/reports/api/schemas'
import { GetAmountEquipmentSpentReportTransformedSuccessResponse } from 'features/reports/api/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetAmountEquipmentSpentReportResult = CustomUseQueryHookResult<
  GetAmountEquipmentSpentReportQueryArgs,
  GetAmountEquipmentSpentReportTransformedSuccessResponse
>

type UseGetAmountEquipmentSpentReportOptions = CustomUseQueryOptions<
  GetAmountEquipmentSpentReportQueryArgs,
  GetAmountEquipmentSpentReportTransformedSuccessResponse
>

export const useGetAmountEquipmentSpentReport = (
  args: GetAmountEquipmentSpentReportQueryArgs,
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
