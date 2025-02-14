import { getEmployeesActionsReportXlsxErrorMessage } from 'features/reports/api/constants'
import { useLazyGetEmployeesActionsReportXlsxQuery } from 'features/reports/api/endpoints/reports.endpoints'
import { GetEmployeesActionsReportXlsxRequest } from 'features/reports/api/schemas'
import { GetEmployeesActionsReportXlsxTransformedResponse } from 'features/reports/api/types'
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
  GetEmployeesActionsReportXlsxRequest,
  GetEmployeesActionsReportXlsxTransformedResponse
>

export const useLazyGetEmployeesActionsReportXlsx = (): UseGetEmployeesActionsReportXlsxResult => {
  const [trigger, state] = useLazyGetEmployeesActionsReportXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEmployeesActionsReportXlsxErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
