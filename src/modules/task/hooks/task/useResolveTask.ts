import { useCallback, useEffect } from 'react'

import { resolveTaskMessages } from 'modules/task/constants/task'
import { ResolveTaskMutationArgs } from 'modules/task/models'
import { taskResolutionApiPermissions } from 'modules/task/permissions'
import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(resolveTaskMessages.commonError)
      }
    }
  }, [state.error])

  return { fn, state }
}
