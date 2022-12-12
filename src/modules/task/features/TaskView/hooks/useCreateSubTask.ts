import { useCallback, useEffect } from 'react'

import { useCreateSubTaskMutation } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { CreateSubTaskMutationArgsModel } from '../models'
import { subTaskApiPermissions } from '../permissions'

const useCreateSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useCreateSubTaskMutation()

  const fn = useCallback(
    async (data: CreateSubTaskMutationArgsModel) => {
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

export default useCreateSubTask
