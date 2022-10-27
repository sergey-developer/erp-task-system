import { useCallback, useEffect } from 'react'

import { CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG } from 'modules/task/features/TaskView/constants/messages'
import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/features/TaskView/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/features/TaskView/permissions'
import { useCreateReclassificationRequestMutation } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

const useCreateTaskReclassificationRequest = () => {
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )
  const [mutation, state] = useCreateReclassificationRequestMutation()

  const fn = useCallback(
    async (data: CreateTaskReclassificationRequestMutationArgsModel) => {
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
        CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
      )
    } else if (!isBadRequestError(error)) {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useCreateTaskReclassificationRequest
