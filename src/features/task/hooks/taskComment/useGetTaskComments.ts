import { getTaskCommentsErrMsg } from 'features/task/constants/taskComment'
import {
  GetTaskCommentListRequest,
  GetTaskCommentListResponse,
} from 'features/task/models'
import { useGetTaskCommentListQuery } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCommentListResult = CustomUseQueryHookResult<
  GetTaskCommentListRequest,
  GetTaskCommentListResponse
>

type UseGetTaskCommentListOptions = CustomUseQueryOptions<
  GetTaskCommentListRequest,
  GetTaskCommentListResponse
>

export const useGetTaskComments = (
  args: GetTaskCommentListRequest,
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
