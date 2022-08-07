import { useEffect } from 'react'

import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import getTaskCountersPermissions from '../permissions/getTaskCounters.permissions'

const useGetTaskCounters = () => {
  const permissions = useUserPermissions(getTaskCountersPermissions)

  const state = useGetTaskCountersQuery(null, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse
    const errorDetail = getErrorDetail(error)
    showMultipleErrorNotification(errorDetail)
  }, [state.error, state.isError])

  return state
}

export default useGetTaskCounters
