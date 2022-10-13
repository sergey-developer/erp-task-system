import { useCallback, useEffect } from 'react'

import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { RESOLVE_TASK_COMMON_ERROR_MSG } from '../constants/messages'
import { ResolveTaskMutationArgsModel } from '../models'
import { taskApiPermissions } from '../permissions/task.permissions'

const useResolveTask = () => {
  const [mutation, state] = useResolveTaskMutation()
  const permissions = useUserPermissions(taskApiPermissions.taskResolution)

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

    if (!isBadRequestError(error)) {
      showErrorNotification(RESOLVE_TASK_COMMON_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useResolveTask
