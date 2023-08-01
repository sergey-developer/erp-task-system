import { useCallback, useEffect } from 'react'

import { subTaskApiMessages } from 'modules/subTask/constants/errorMessages'
import { CreateSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useCreateSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import {
  isClientRangeError,
  isErrorResponse,
  isServerRangeError,
} from 'shared/services/api'
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
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      if (isClientRangeError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(subTaskApiMessages.createSubTask.commonError)
      }
    }
  }, [state.error, state.isError])

  return { fn, state }
}
