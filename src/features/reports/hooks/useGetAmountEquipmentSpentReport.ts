import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getAmountEquipmentSpentReportErrMsg } from 'features/reports/constants'
import { GetAmountEquipmentSpentReportQueryArgs } from 'features/reports/models'
import { useGetAmountEquipmentSpentReportQuery } from 'features/reports/services/reportsApi.service'
import { GetAmountEquipmentSpentReportTransformedSuccessResponse } from 'features/reports/types'

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
