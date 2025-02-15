import { getSubTasksErrorMessage } from 'features/tasks/api/constants'
import { useGetSubTasksQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { GetSubTasksRequest, GetSubTasksResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSubTasksResult = CustomUseQueryHookResult<GetSubTasksRequest, GetSubTasksResponse>

type UseGetSubTasksOptions = CustomUseQueryOptions<GetSubTasksRequest, GetSubTasksResponse>

export const useGetSubTasks = (
  args: GetSubTasksRequest,
  options?: UseGetSubTasksOptions,
): UseGetSubTasksResult => {
  const state = useGetSubTasksQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getSubTasksErrorMessage)
      }
    }
  }, [state.error])

  return state
}
