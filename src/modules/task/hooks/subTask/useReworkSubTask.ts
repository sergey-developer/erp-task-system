import { useCallback, useEffect } from 'react'

import { ReworkSubTaskMutationArgs } from 'modules/task/models'
import { subTaskApiPermissions } from 'modules/task/permissions'
import { useReworkSubTaskMutation } from 'modules/task/services/subTaskApiService'
import { useUserPermissions } from 'modules/user/hooks'

import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
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
