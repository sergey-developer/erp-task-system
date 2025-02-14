import { useGetTaskMonitoringQuery } from 'features/monitoring/api/endpoints/monitoring.endpoints'
import {
  GetTaskMonitoringRequest,
  GetTaskMonitoringResponse,
} from 'features/monitoring/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskMonitoringResult = CustomUseQueryHookResult<
  GetTaskMonitoringRequest,
  GetTaskMonitoringResponse
>

type UseGetTaskMonitoringOptions = CustomUseQueryOptions<
  GetTaskMonitoringRequest,
  GetTaskMonitoringResponse
>

export const useGetTaskMonitoring = (
  args: GetTaskMonitoringRequest,
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
