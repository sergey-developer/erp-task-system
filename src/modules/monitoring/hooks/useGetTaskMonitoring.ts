import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse,
} from 'modules/monitoring/models'
import { useGetTaskMonitoringQuery } from 'modules/monitoring/services/monitoringApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskMonitoringResult = CustomUseQueryHookResult<
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse
>

type UseGetTaskMonitoringOptions = CustomUseQueryOptions<
  GetTaskMonitoringQueryArgs,
  GetTaskMonitoringSuccessResponse
>

export const useGetTaskMonitoring = (
  args: GetTaskMonitoringQueryArgs,
  options?: UseGetTaskMonitoringOptions,
): UseGetTaskMonitoringResult => {
  const state = useGetTaskMonitoringQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error) && state.error.data.detail) {
      showErrorNotification(state.error.data.detail)
    }
  }, [state.error])

  return state
}
