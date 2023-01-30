import { useCallback, useEffect } from 'react'

import { CancelSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useCancelSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCancelSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useCancelSubTaskMutation()

  const fn = useCallback(
    async (data: CancelSubTaskMutationArgs) => {
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
