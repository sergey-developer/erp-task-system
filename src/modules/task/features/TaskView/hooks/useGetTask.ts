import { useEffect } from 'react'

import { GetTaskQueryArgsModel } from 'modules/task/features/TaskView/models'
import { taskApiPermissions } from 'modules/task/features/TaskView/permissions/task.permissions'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/features/TaskView/utils/messages'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isBadRequestError,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetTask = (id: GetTaskQueryArgsModel) => {
  const permissions = useUserPermissions(taskApiPermissions.task)

  const state = useGetTaskQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (isBadRequestError(error) || isServerRangeError(error)) {
      showErrorNotification(getTaskServerErrorMsg(id))
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTask
