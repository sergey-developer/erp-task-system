import { useEffect } from 'react'

import { GetTaskMonitoringQueryArgs } from 'modules/monitoring/models'
import { useGetTaskMonitoringQuery } from 'modules/monitoring/services/monitoringApi.service'

import { getErrorDetail, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskMonitoring = (
  args: GetTaskMonitoringQueryArgs,
  options?: Partial<{ skip: boolean }>,
) => {
  const state = useGetTaskMonitoringQuery(args, options)

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      showErrorNotification(getErrorDetail(state.error))
    }
  }, [state.error])

  return state
}
