import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getEmployeesActionsReportErrMsg } from '../constants'
import { GetEmployeesActionsReportQueryArgs } from '../models'
import { useGetEmployeesActionsReportQuery } from '../services/employeeReportsApi.service'
import { GetEmployeesActionsReportTransformedSuccessResponse } from '../types'

type UseGetEmployeesActionsReportResult = CustomUseQueryHookResult<
  GetEmployeesActionsReportQueryArgs,
  GetEmployeesActionsReportTransformedSuccessResponse
>

type UseGetEmployeesActionsReportOptions = CustomUseQueryOptions<
  GetEmployeesActionsReportQueryArgs,
  GetEmployeesActionsReportTransformedSuccessResponse
>

export const useGetEmployeesActionsReport = (
  args: GetEmployeesActionsReportQueryArgs,
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
