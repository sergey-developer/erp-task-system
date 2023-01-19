import { useEffect } from 'react'

import { GetTaskMonitoringQueryArgs } from 'modules/monitoring/models'
import { useGetTaskMonitoringQuery } from 'modules/monitoring/services/monitoringApi.service'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskMonitoring = (
  args: GetTaskMonitoringQueryArgs,
  options?: Partial<{ skip: boolean }>,
) => {
  const state = useGetTaskMonitoringQuery(args, options)

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification('Не удалось получить данные мониторинга заявок')
  }, [state.isError])

  return state
}
