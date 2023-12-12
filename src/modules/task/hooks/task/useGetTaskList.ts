import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskListErrorMsg } from 'modules/task/constants/task'
import { GetTaskListQueryArgs } from 'modules/task/models'
import { useGetTaskListQuery } from 'modules/task/services/taskApi.service'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskListResult = CustomUseQueryHookResult<
  GetTaskListQueryArgs,
  GetTaskListTransformedSuccessResponse
>

type UseGetTaskListOptions = CustomUseQueryOptions<
  GetTaskListQueryArgs,
  GetTaskListTransformedSuccessResponse
>

export const useGetTaskList = (
  args: GetTaskListQueryArgs,
  options?: UseGetTaskListOptions,
): UseGetTaskListResult => {
  const state = useGetTaskListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListErrorMsg)
    }
  }, [state.error])

  return state
}
