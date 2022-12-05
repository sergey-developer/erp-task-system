import { useCallback, useEffect } from 'react'

import { useReworkSubTaskMutation } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, isBadRequestError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import { ReworkSubTaskMutationArgsModel } from '../models'
import { subTaskApiPermissions } from '../permissions'

const useReworkSubTask = () => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const [mutation, state] = useReworkSubTaskMutation()

  const fn = useCallback(
    async (data: ReworkSubTaskMutationArgsModel) => {
      // if (permissions.canDelete) {
      await mutation(data).unwrap()
      // }
    },
    [mutation],
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

export default useReworkSubTask
