import { useEffect } from 'react'

import { GetTaskCommentListQueryArgsModel } from 'modules/task/components/TaskView/models'
import { taskCommentListApiPermissions } from 'modules/task/components/TaskView/permissions/taskCommentList.permissions'
import {
  getTaskCommentListServerErrorMsg,
  getTaskNotFoundErrorMsg,
} from 'modules/task/components/TaskView/utils/messages'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskCommentApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

const useGetTaskCommentList = (id: GetTaskCommentListQueryArgsModel) => {
  const permissions = useUserPermissions(taskCommentListApiPermissions)

  const state = useGetTaskCommentListQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (error.status === HttpStatusCodeEnum.NotFound) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (error.status! >= HttpStatusCodeEnum.ServerError) {
      showErrorNotification(getTaskCommentListServerErrorMsg(id))
    } else {
      const errorDetail = getErrorDetail(error)
      showMultipleErrorNotification(errorDetail)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTaskCommentList
