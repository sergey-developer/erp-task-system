import { useEffect } from 'react'

import { GetTaskQueryArgsModel } from 'modules/task/components/TaskView/models'
import { taskApiPermissions } from 'modules/task/components/TaskView/permissions/task.permissions'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/components/TaskView/utils/messages'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

const useGetTask = (id: GetTaskQueryArgsModel) => {
  const permissions = useUserPermissions(taskApiPermissions.task)

  const state = useGetTaskQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (
      error.status === HttpStatusCodeEnum.BadRequest ||
      error.status! >= HttpStatusCodeEnum.ServerError
    ) {
      showErrorNotification(getTaskServerErrorMsg(id))
    } else {
      const errorDetail = getErrorDetail(error)
      showMultipleErrorNotification(errorDetail)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTask
