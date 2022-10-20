import { useEffect } from 'react'

import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { taskCountersApiPermissions } from '../permissions'

const useGetTaskCounters = () => {
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

export default useGetTaskCounters
