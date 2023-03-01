import { useCallback, useEffect } from 'react'

import { ReworkSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useReworkSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useReworkSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useReworkSubTaskMutation()

  const fn = useCallback(
    async (data: ReworkSubTaskMutationArgs) => {
      if (permissions.canRework) {
        await mutation(data).unwrap()
      }
    },
    [mutation, permissions.canRework],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (!isBadRequestError(error)) {
      showErrorNotification('Не удалось вернуть задание на доработку')
    }
  }, [state.error, state.isError])

  return { fn, state }
}
