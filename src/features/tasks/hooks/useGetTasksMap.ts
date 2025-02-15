import { getTasksMapErrorMessage } from 'features/tasks/api/constants'
import { useGetTasksMapQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { GetTasksMapRequest, GetTasksMapResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTasksMapResult = CustomUseQueryHookResult<GetTasksMapRequest, GetTasksMapResponse>

type UseGetTasksMapOptions = CustomUseQueryOptions<GetTasksMapRequest, GetTasksMapResponse>

export const useGetTasksMap = (
  args: GetTasksMapRequest,
  options?: UseGetTasksMapOptions,
): UseGetTasksMapResult => {
  const state = useGetTasksMapQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTasksMapErrorMessage)
    }
  }, [state.error])

  return state
}
