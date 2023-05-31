import { useEffect } from 'react'

import { GetTaskMonitoringQueryArgs } from 'modules/monitoring/models'
import { useGetTaskMonitoringQuery } from 'modules/monitoring/services/monitoringApi.service'

import { getErrorDetail, isErrorResponse } from 'shared/services/api'
import { showMultipleErrorNotification } from 'shared/utils/notifications'

export const useGetTaskMonitoring = (
  args: GetTaskMonitoringQueryArgs,
  options?: Partial<{ skip: boolean }>,
) => {
  const state = useGetTaskMonitoringQuery(args, options)

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      showMultipleErrorNotification(getErrorDetail(state.error))
    }
  }, [state.error, state.isError])

  return state
}
