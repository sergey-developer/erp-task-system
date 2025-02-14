import { getAmountEquipmentSpentReportXlsxErrorMessage } from 'features/reports/api/constants'
import { useLazyGetAmountEquipmentSpentReportXlsxQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetAmountEquipmentSpentReportXlsxRequest } from 'features/reports/api/schemas'
import { GetAmountEquipmentSpentReportXlsxTransformedResponse } from 'features/reports/api/types'
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
  GetAmountEquipmentSpentReportXlsxRequest,
  GetAmountEquipmentSpentReportXlsxTransformedResponse
>

export const useLazyGetAmountEquipmentSpentReportXlsx =
  (): UseGetAmountEquipmentSpentReportXlsxResult => {
    const [trigger, state] = useLazyGetAmountEquipmentSpentReportXlsxQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getAmountEquipmentSpentReportXlsxErrorMessage)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
