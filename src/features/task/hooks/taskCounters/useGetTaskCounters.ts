import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskCountersErrMsg } from 'features/task/constants/taskCounters'
import { GetTaskCountersQueryArgs, GetTaskCountersSuccessResponse } from 'features/task/models'
import { useGetTaskCountersQuery } from 'features/task/services/taskApi.service'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCountersResult = CustomUseQueryHookResult<
  MaybeUndefined<GetTaskCountersQueryArgs>,
  GetTaskCountersSuccessResponse
>

type UseGetTaskCountersOptions = CustomUseQueryOptions<
  MaybeUndefined<GetTaskCountersQueryArgs>,
  GetTaskCountersSuccessResponse
>

export const useGetTaskCounters = (
  args?: GetTaskCountersQueryArgs,
  options?: UseGetTaskCountersOptions,
): UseGetTaskCountersResult => {
  const state = useGetTaskCountersQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskCountersErrMsg)
    }
  }, [state.error])

  return state
}
