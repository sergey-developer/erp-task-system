import { useCallback, useEffect } from 'react'

import { CancelSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useCancelSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
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
    if (!state.error) return

    if (isErrorResponse(state.error) && !isBadRequestError(state.error)) {
      showErrorNotification('Не удалось отменить задание')
    }
  }, [state.error])

  return { fn, state }
}
