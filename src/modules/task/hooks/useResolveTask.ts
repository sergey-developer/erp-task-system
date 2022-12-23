import { useCallback, useEffect } from 'react'

import { ResolveTaskMutationArgsModel } from 'modules/task/models'
import { taskResolutionApiPermissions } from 'modules/task/permissions'
import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import {
  ErrorResponse,
  getErrorDetail,
  isBadRequestError,
  isForbiddenError,
} from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

import { RESOLVE_TASK_COMMON_ERROR_MSG } from '../constants/messages'

export const useResolveTask = () => {
  const permissions = useUserPermissions(taskResolutionApiPermissions)
  const [mutation, state] = useResolveTaskMutation()

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

    if (isForbiddenError(error)) {
      showMultipleErrorNotification(getErrorDetail(error))
    } else if (!isBadRequestError(error)) {
      showErrorNotification(RESOLVE_TASK_COMMON_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
