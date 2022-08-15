import { useCallback, useEffect } from 'react'

import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import { ResolveTaskMutationArgsModel } from '../models'
import { taskApiPermissions } from '../permissions/task.permissions'

const useResolveTask = () => {
  const [mutation, state] = useResolveTaskMutation()
  const permissions = useUserPermissions(taskApiPermissions.updateResolution)

  const fn = useCallback(
    async (data: ResolveTaskMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse
    const errorDetail = getErrorDetail(error)
    showMultipleErrorNotification(errorDetail)
  }, [state.error, state.isError])

  return { fn, state }
}

export default useResolveTask
