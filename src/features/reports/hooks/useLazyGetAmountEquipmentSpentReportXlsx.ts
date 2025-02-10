import { GetAmountEquipmentSpentReportXlsxQueryArgs } from 'features/reports/api/dto'
import { GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse } from 'features/reports/api/types'
import { getAmountEquipmentSpentReportXlsxErrMsg } from 'features/reports/constants'
import { useLazyGetAmountEquipmentSpentReportXlsxQuery } from 'features/reports/services/reportsApi.service'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetAmountEquipmentSpentReportXlsxResult = CustomUseLazyQueryHookResult<
  GetAmountEquipmentSpentReportXlsxQueryArgs,
  GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse
>

export const useLazyGetAmountEquipmentSpentReportXlsx =
  (): UseGetAmountEquipmentSpentReportXlsxResult => {
    const [trigger, state] = useLazyGetAmountEquipmentSpentReportXlsxQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getAmountEquipmentSpentReportXlsxErrMsg)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
