import { useCallback, useEffect } from 'react'

import { CreateSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useCreateSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import {
  ErrorResponse,
  isClientRangeError,
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

    const error = state.error as ErrorResponse

    if (isClientRangeError(error) || isServerRangeError(error)) {
      showErrorNotification('Не удалось создать задание')
    }
  }, [state.error, state.isError])

  return { fn, state }
}
