import { useCallback, useEffect } from 'react'

import { useCreateSubTaskMutation } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isBadRequestError,
  isClientRangeError,
  isServerRangeError,
} from 'shared/services/api'
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
        // unwrap?? протестить что без него будет при ошибке
      }
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse

    if (isBadRequestError(error)) {
      return
    } else if (isClientRangeError(error) || isServerRangeError(error)) {
      showErrorNotification('Не удалось создать задание')
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useCreateSubTask
