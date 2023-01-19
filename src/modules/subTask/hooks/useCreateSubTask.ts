import { useCallback, useEffect } from 'react'

import { CreateSubTaskMutationArgs } from 'modules/subTask/models'
import { useUserPermissions } from 'modules/user/hooks'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { subTaskApiPermissions } from '../permissions'
import { useCreateSubTaskMutation } from '../services/subTaskApi.service'

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

    if (!isBadRequestError(error)) {
      showErrorNotification('Не удалось создать задание')
    }
  }, [state.error, state.isError])

  return { fn, state }
}
