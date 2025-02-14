import { getTasksErrorMessage } from 'features/task/constants/task'
import { GetTasksRequest } from 'features/task/models'
import { useGetTasksQuery } from 'features/task/services/taskApi.service'
import { GetTasksTransformedResponse } from 'features/task/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTasksResult = CustomUseQueryHookResult<GetTasksRequest, GetTasksTransformedResponse>

type UseGetTasksOptions = CustomUseQueryOptions<GetTasksRequest, GetTasksTransformedResponse>

export const useGetTasks = (
  args: GetTasksRequest,
  options?: UseGetTasksOptions,
): UseGetTasksResult => {
  const state = useGetTasksQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTasksErrorMessage)
      }
    }
  }, [state.error])

  return state
}
