import { getTasksErrorMessage } from 'features/tasks/api/constants'
import { useGetTasksQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { GetTasksRequest } from 'features/tasks/api/schemas'
import { GetTasksTransformedResponse } from 'features/tasks/api/types'
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
