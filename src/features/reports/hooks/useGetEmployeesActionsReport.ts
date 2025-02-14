import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getEmployeesActionsReportErrMsg } from '../api/constants'
import { useGetEmployeesActionsReportQuery } from '../api/endpoints/reports.endpoints'
import { GetEmployeesActionsReportRequest } from '../api/schemas'
import { GetEmployeesActionsReportTransformedResponse } from '../api/types'

type UseGetEmployeesActionsReportResult = CustomUseQueryHookResult<
  GetEmployeesActionsReportRequest,
  GetEmployeesActionsReportTransformedResponse
>

type UseGetEmployeesActionsReportOptions = CustomUseQueryOptions<
  GetEmployeesActionsReportRequest,
  GetEmployeesActionsReportTransformedResponse
>

export const useGetEmployeesActionsReport = (
  args: GetEmployeesActionsReportRequest,
  options?: UseGetEmployeesActionsReportOptions,
): UseGetEmployeesActionsReportResult => {
  const state = useGetEmployeesActionsReportQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEmployeesActionsReportErrMsg)
      }
    }
  }, [state.error])

  return state
}
