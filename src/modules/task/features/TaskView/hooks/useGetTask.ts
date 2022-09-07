import { useEffect } from 'react'

import { GetTaskQueryArgsModel } from 'modules/task/features/TaskView/models'
import { taskApiPermissions } from 'modules/task/features/TaskView/permissions/task.permissions'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/features/TaskView/utils/messages'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import { ErrorResponse } from 'shared/services/api'
import { isEqual } from 'shared/utils/common/isEqual'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetTask = (id: GetTaskQueryArgsModel) => {
  const permissions = useUserPermissions(taskApiPermissions.task)

  const state = useGetTaskQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isEqual(error.status, HttpStatusCodeEnum.NotFound)) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (
      isEqual(error.status, HttpStatusCodeEnum.BadRequest) ||
      error.status >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification(getTaskServerErrorMsg(id))
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTask
