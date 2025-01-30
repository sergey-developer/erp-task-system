import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskCommentsErrMsg } from 'features/task/constants/taskComment'
import { GetTaskCommentListQueryArgs, GetTaskCommentListSuccessResponse } from 'features/task/models'
import { useGetTaskCommentListQuery } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCommentListResult = CustomUseQueryHookResult<
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse
>

type UseGetTaskCommentListOptions = CustomUseQueryOptions<
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse
>

export const useGetTaskCommentList = (
  args: GetTaskCommentListQueryArgs,
  options?: UseGetTaskCommentListOptions,
): UseGetTaskCommentListResult => {
  const state = useGetTaskCommentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskCommentsErrMsg)
      }
    }
  }, [args.taskId, state.error])

  return state
}
