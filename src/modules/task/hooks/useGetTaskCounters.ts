import { useEffect } from 'react'

import { taskCountersApiPermissions } from 'modules/task/permissions'
import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskCounters = () => {
  const permissions = useUserPermissions(taskCountersApiPermissions)

  const state = useGetTaskCountersQuery(null, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return state
}
