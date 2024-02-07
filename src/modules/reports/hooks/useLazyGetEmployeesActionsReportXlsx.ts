import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getEmployeesActionsReportXlsxErrMsg } from '../constants'
import {
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxSuccessResponse,
} from '../models'
import { useLazyGetEmployeesActionsReportXlsxQuery } from '../services/employeeReportsApi.service'

type UseGetEmployeesActionsReportXlsxResult = CustomUseLazyQueryHookResult<
  GetEmployeesActionsReportXlsxQueryArgs,
  GetEmployeesActionsReportXlsxSuccessResponse
>

export const useLazyGetEmployeesActionsReportXlsx = (): UseGetEmployeesActionsReportXlsxResult => {
  const [trigger, state] = useLazyGetEmployeesActionsReportXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getEmployeesActionsReportXlsxErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
