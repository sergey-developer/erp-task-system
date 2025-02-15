import { getTaskCommentsErrorMessage } from 'features/tasks/api/constants'
import { useGetTaskCommentsQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { GetTaskCommentsRequest, GetTaskCommentsResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCommentsResult = CustomUseQueryHookResult<
  GetTaskCommentsRequest,
  GetTaskCommentsResponse
>

type UseGetTaskCommentsOptions = CustomUseQueryOptions<
  GetTaskCommentsRequest,
  GetTaskCommentsResponse
>

export const useGetTaskComments = (
  args: GetTaskCommentsRequest,
  options?: UseGetTaskCommentsOptions,
): UseGetTaskCommentsResult => {
  const state = useGetTaskCommentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskCommentsErrorMessage)
      }
    }
  }, [args.taskId, state.error])

  return state
}
