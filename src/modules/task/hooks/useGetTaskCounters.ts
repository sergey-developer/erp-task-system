import { useEffect } from 'react'

import { taskCountersApiPermissions } from 'modules/task/permissions'
import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskCounters = () => {
  const permissions = useUserPermissions(taskCountersApiPermissions)

  const state = useGetTaskCountersQuery(undefined, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(commonApiMessages.unknownError)
  }, [state.isError])

  return state
}
