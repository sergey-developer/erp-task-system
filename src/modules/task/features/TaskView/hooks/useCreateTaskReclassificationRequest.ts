import { useCallback, useEffect } from 'react'

import { CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG } from 'modules/task/features/TaskView/constants/messages'
import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/features/TaskView/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/features/TaskView/permissions/taskReclassificationRequest.permissions'
import { useCreateReclassificationRequestMutation } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

const useCreateTaskReclassificationRequest = () => {
  const [mutation, state] = useCreateReclassificationRequestMutation()
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )

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

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(
        CREATE_TASK_RECLASSIFICATION_REQUEST_NOT_FOUND_ERROR_MSG,
      )
    } else {
      const errorDetail = getErrorDetail(error)
      showMultipleErrorNotification(errorDetail)
    }
  }, [state.error, state.isError])

  return { fn, state }
}

export default useCreateTaskReclassificationRequest
