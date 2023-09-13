import { useCallback, useEffect } from 'react'

import { ReworkSubTaskMutationArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useReworkSubTaskMutation } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { isBadRequestError, isErrorResponse } from 'shared/services/api'
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
    if (!state.error) return

    if (isErrorResponse(state.error) && !isBadRequestError(state.error)) {
      showErrorNotification('Не удалось вернуть задание на доработку')
    }
  }, [state.error])

  return { fn, state }
}
