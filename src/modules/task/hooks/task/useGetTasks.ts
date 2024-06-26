import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTasksErrMsg } from 'modules/task/constants/task'
import { GetTasksQueryArgs } from 'modules/task/models'
import { useGetTasksQuery } from 'modules/task/services/taskApi.service'
import { GetTasksTransformedSuccessResponse } from 'modules/task/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTasksResult = CustomUseQueryHookResult<
  GetTasksQueryArgs,
  GetTasksTransformedSuccessResponse
>

type UseGetTasksOptions = CustomUseQueryOptions<
  GetTasksQueryArgs,
  GetTasksTransformedSuccessResponse
>

export const useGetTasks = (
  args: GetTasksQueryArgs,
  options?: UseGetTasksOptions,
): UseGetTasksResult => {
  const state = useGetTasksQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTasksErrMsg)
      }
    }
  }, [state.error])

  return state
}
