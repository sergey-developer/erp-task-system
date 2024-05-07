import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { GetTaskCommentListQueryArgs, GetTaskCommentListSuccessResponse } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskApi.service'
import { getTaskNotFoundErrMsg } from 'modules/task/utils/task'
import { getTaskCommentListServerErrMsg } from 'modules/task/utils/taskComment'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse, isNotFoundError, isServerRangeError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCommentListResult = CustomUseQueryHookResult<
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse
>

export const useGetTaskCommentList = (
  args: GetTaskCommentListQueryArgs,
): UseGetTaskCommentListResult => {
  const permissions = useUserPermissions(taskCommentApiPermissions)

  const state = useGetTaskCommentListQuery(args, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getTaskNotFoundErrMsg(args.taskId))
      } else if (isServerRangeError(state.error)) {
        showErrorNotification(getTaskCommentListServerErrMsg(args.taskId))
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [args.taskId, state.error])

  return state
}
