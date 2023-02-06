import { useCallback, useEffect } from 'react'

import { reclassificationRequestApiMessages } from 'modules/task/constants/errorMessages'
import { CreateTaskReclassificationRequestMutationArgs } from 'modules/task/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/permissions'
import { useCreateReclassificationRequestMutation } from 'modules/task/services/taskReclassificationRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { commonApiMessages } from 'shared/constants/errors'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useCreateTaskReclassificationRequest = () => {
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )
  const [mutation, state] = useCreateReclassificationRequestMutation()

  const fn = useCallback(
    async (data: CreateTaskReclassificationRequestMutationArgs) => {
      if (!permissions.canCreate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canCreate],
  )

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(
        reclassificationRequestApiMessages.create.notFoundError,
      )
    } else if (!isBadRequestError(error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error, state.isError])

  return { fn, state }
}
