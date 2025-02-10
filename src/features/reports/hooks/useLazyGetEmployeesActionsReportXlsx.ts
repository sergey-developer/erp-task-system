import { GetEmployeesActionsReportXlsxQueryArgs } from 'features/reports/api/dto'
import { GetEmployeesActionsReportXlsxTransformedSuccessResponse } from 'features/reports/api/types'
import { getEmployeesActionsReportXlsxErrMsg } from 'features/reports/constants'
import { useLazyGetEmployeesActionsReportXlsxQuery } from 'features/reports/services/reportsApi.service'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEmployeesActionsReportXlsxResult = CustomUseLazyQueryHookResult<
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxTransformedSuccessResponse
>

export const useLazyGetEmployeesActionsReportXlsx = (): UseGetEmployeesActionsReportXlsxResult => {
  const [trigger, state] = useLazyGetEmployeesActionsReportXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEmployeesActionsReportXlsxErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
