import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskListMapErrorMsg } from 'modules/task/constants/task'
import { GetTaskListMapQueryArgs, GetTaskListMapSuccessResponse } from 'modules/task/models'
import { useGetTaskListMapQuery } from 'modules/task/services/taskApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskListMapResult = CustomUseQueryHookResult<
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse
>

type UseGetTaskListMapOptions = CustomUseQueryOptions<
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse
>

export const useGetTaskListMap = (
  args: GetTaskListMapQueryArgs,
  options?: UseGetTaskListMapOptions,
): UseGetTaskListMapResult => {
  const state = useGetTaskListMapQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskListMapErrorMsg)
    }
  }, [state.error])

  return state
}
