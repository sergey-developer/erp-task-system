import { useEffect } from 'react'

import { GetTaskCommentListQueryArgsModel } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskCommentApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import {
  ErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

import {
  getTaskCommentListServerErrorMsg,
  getTaskNotFoundErrorMsg,
} from '../utils/messages'

export const useGetTaskCommentList = (id: GetTaskCommentListQueryArgsModel) => {
  const permissions = useUserPermissions(taskCommentApiPermissions)

  const state = useGetTaskCommentListQuery(id, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (isNotFoundError(error)) {
      showErrorNotification(getTaskNotFoundErrorMsg(id))
    } else if (isServerRangeError(error)) {
      showErrorNotification(getTaskCommentListServerErrorMsg(id))
    } else {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [id, state.error, state.isError])

  return state
}
