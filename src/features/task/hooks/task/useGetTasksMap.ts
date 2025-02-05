import { getTaskListMapErrMsg } from 'features/task/constants/task'
import { GetTaskListMapQueryArgs, GetTaskListMapSuccessResponse } from 'features/task/models'
import { useGetTaskListMapQuery } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskListMapResult = CustomUseQueryHookResult<
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse
>

type UseGetTaskListMapOptions = CustomUseQueryOptions<
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse
>

export const useGetTasksMap = (
  args: GetTaskListMapQueryArgs,
  options?: UseGetTaskListMapOptions,
): UseGetTaskListMapResult => {
  const state = useGetTaskListMapQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListMapErrMsg)
    }
  }, [state.error])

  return state
}
