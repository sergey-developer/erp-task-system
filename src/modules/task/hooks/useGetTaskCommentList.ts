import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { GetTaskCommentListQueryArgs, GetTaskCommentListSuccessResponse } from 'modules/task/models'
import { taskCommentApiPermissions } from 'modules/task/permissions'
import { useGetTaskCommentListQuery } from 'modules/task/services/taskCommentApi.service'
import { getTaskCommentListServerErrorMsg, getTaskNotFoundErrorMsg } from 'modules/task/utils'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse, isNotFoundError, isServerRangeError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCommentListResult = CustomUseQueryHookResult<
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse
>

export const useGetTaskCommentList = (
  id: GetTaskCommentListQueryArgs,
): UseGetTaskCommentListResult => {
  const permissions = useUserPermissions(taskCommentApiPermissions)

  const state = useGetTaskCommentListQuery(id, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getTaskNotFoundErrorMsg(id))
      } else if (isServerRangeError(state.error)) {
        showErrorNotification(getTaskCommentListServerErrorMsg(id))
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [id, state.error])

  return state
}
