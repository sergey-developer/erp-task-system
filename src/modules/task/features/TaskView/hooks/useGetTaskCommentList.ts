import { useEffect } from 'react'

import { GetTaskCommentListQueryArgsModel } from 'modules/task/features/TaskView/models'
import { taskCommentListApiPermissions } from 'modules/task/features/TaskView/permissions/taskCommentList.permissions'
import {
  getTaskCommentListServerErrorMsg,
  getTaskNotFoundErrorMsg,
} from 'modules/task/features/TaskView/utils/messages'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskCommentApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { HttpStatusCodeEnum } from 'shared/constants/http'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import { ErrorResponse } from 'shared/services/api'
import { isEqual } from 'shared/utils/common/isEqual'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

const useGetTaskCommentList = (id: GetTaskCommentListQueryArgsModel) => {
  const permissions = useUserPermissions(taskCommentListApiPermissions)

  const state = useGetTaskCommentListQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isEqual(error.status, HttpStatusCodeEnum.NotFound)) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (error.status >= HttpStatusCodeEnum.ServerError) {
      showErrorNotification(getTaskCommentListServerErrorMsg(id))
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [id, state.error, state.isError])

  return state
}

export default useGetTaskCommentList
