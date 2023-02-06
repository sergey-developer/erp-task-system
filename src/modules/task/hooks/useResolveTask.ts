import { useCallback, useEffect } from 'react'

import { taskApiMessages } from 'modules/task/constants/errorMessages'
import { ResolveTaskMutationArgs } from 'modules/task/models'
import { taskResolutionApiPermissions } from 'modules/task/permissions'
import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import {
  ErrorResponse,
  getErrorDetail,
  isBadRequestError,
} from 'shared/services/api'
import {
  showErrorNotification,
  showMultipleErrorNotification,
} from 'shared/utils/notifications'

export const useResolveTask = () => {
  const permissions = useUserPermissions(taskResolutionApiPermissions)
  const [mutation, state] = useResolveTaskMutation()

  const fn = useCallback(
    async (data: ResolveTaskMutationArgs) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isBadRequestError(error)) {
      showMultipleErrorNotification(getErrorDetail(error))
    } else {
      showErrorNotification(taskApiMessages.resolve.commonError)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
