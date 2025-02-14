import { getSubTasksErrorMessage } from 'features/task/constants/task'
import { GetSubTaskListRequest, GetSubTaskListResponse } from 'features/task/models'
import { useGetSubTaskListQuery } from 'features/task/services/taskApi.service'
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

type UseGetSubTaskListResult = CustomUseQueryHookResult<
  GetSubTaskListRequest,
  GetSubTaskListResponse
>

type UseGetSubTaskListOptions = CustomUseQueryOptions<
  GetSubTaskListRequest,
  GetSubTaskListResponse
>

export const useGetSubTasks = (
  args: GetSubTaskListRequest,
  options?: UseGetSubTaskListOptions,
): UseGetSubTaskListResult => {
  const state = useGetSubTaskListQuery(args, options)

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
