import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEmployeesActionsReportQueryArgs } from '../api/dto'
import { GetEmployeesActionsReportTransformedSuccessResponse } from '../api/types'
import { getEmployeesActionsReportErrMsg } from '../constants'
import { useGetEmployeesActionsReportQuery } from '../services/reportsApi.service'

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
