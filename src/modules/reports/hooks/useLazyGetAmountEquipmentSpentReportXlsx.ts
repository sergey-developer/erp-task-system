import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getAmountEquipmentSpentReportXlsxErrMsg } from 'modules/reports/constants'
import { GetAmountEquipmentSpentReportXlsxQueryArgs } from 'modules/reports/models'
import { useLazyGetAmountEquipmentSpentReportXlsxQuery } from 'modules/reports/services/reportsApi.service'
import { GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse } from 'modules/reports/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
