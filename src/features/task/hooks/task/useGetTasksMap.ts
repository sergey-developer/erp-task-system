import { getTaskListMapErrorMessage } from 'features/task/constants/task'
import { GetTaskListMapRequest, GetTaskListMapResponse } from 'features/task/models'
import { useGetTaskListMapQuery } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskListMapResult = CustomUseQueryHookResult<
  GetTaskListMapRequest,
  GetTaskListMapResponse
>

type UseGetTaskListMapOptions = CustomUseQueryOptions<GetTaskListMapRequest, GetTaskListMapResponse>

export const useGetTasksMap = (
  args: GetTaskListMapRequest,
  options?: UseGetTaskListMapOptions,
): UseGetTaskListMapResult => {
  const state = useGetTaskListMapQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListMapErrorMessage)
    }
  }, [state.error])

  return state
}
