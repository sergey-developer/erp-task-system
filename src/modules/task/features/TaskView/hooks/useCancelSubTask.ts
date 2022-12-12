import { useCallback, useEffect } from 'react'

import { useDeleteSubTaskMutation } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { DeleteSubTaskMutationArgsModel } from '../models'
import { subTaskApiPermissions } from '../permissions'

const useCancelSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useDeleteSubTaskMutation()

  const fn = useCallback(
    async (data: DeleteSubTaskMutationArgsModel) => {
      if (permissions.canDelete) {
        await mutation(data).unwrap()
      }
    },
    [mutation, permissions.canDelete],
  )

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse

    if (!isBadRequestError(error)) {
      showErrorNotification('Не удалось отменить задание')
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useCancelSubTask
