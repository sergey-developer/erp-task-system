import { useCallback, useEffect } from 'react'

import { createSubTaskMessages } from 'modules/task/constants/task'
import { CreateSubTaskMutationArgs } from 'modules/task/models'
import { subTaskApiPermissions } from 'modules/task/permissions'
import { useCreateSubTaskMutation } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { isClientRangeError, isErrorResponse, isServerRangeError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCreateSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useCreateSubTaskMutation()

  const fn = useCallback(
    async (data: CreateSubTaskMutationArgs) => {
      if (permissions.canCreate) {
        await mutation(data).unwrap()
      }
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isClientRangeError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(createSubTaskMessages.commonError)
      }
    }
  }, [state.error])

  return { fn, state }
}
