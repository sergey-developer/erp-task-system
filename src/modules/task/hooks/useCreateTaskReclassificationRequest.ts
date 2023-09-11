import { useCallback, useEffect } from 'react'

import { createReclassificationRequestMessages } from 'modules/task/constants'
import { CreateTaskReclassificationRequestMutationArgs } from 'modules/task/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/permissions'
import { useCreateReclassificationRequestMutation } from 'modules/task/services/taskApiService'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isBadRequestError, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCreateTaskReclassificationRequest = () => {
  const permissions = useUserPermissions(taskReclassificationRequestApiPermissions)
  const [mutation, state] = useCreateReclassificationRequestMutation()

  const fn = useCallback(
    async (data: CreateTaskReclassificationRequestMutationArgs) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(createReclassificationRequestMessages.notFoundError)
      } else if (!isBadRequestError(state.error)) {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error])

  return { fn, state }
}
