import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEmployeesActionsReportXlsxErrMsg } from 'modules/reports/constants'
import { GetEmployeesActionsReportXlsxQueryArgs } from 'modules/reports/models'
import { useLazyGetEmployeesActionsReportXlsxQuery } from 'modules/reports/services/employeeReportsApi.service'
import { GetEmployeesActionsReportXlsxTransformedSuccessResponse } from 'modules/reports/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
