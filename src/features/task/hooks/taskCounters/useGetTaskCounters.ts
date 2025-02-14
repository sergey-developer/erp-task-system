import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskCountersErrorMessage } from 'features/task/constants/taskCounters'
import { GetTaskCountersRequest, GetTaskCountersResponse } from 'features/task/models'
import { useGetTaskCountersQuery } from 'features/task/services/taskApi.service'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCountersResult = CustomUseQueryHookResult<
  MaybeUndefined<GetTaskCountersRequest>,
  GetTaskCountersResponse
>

type UseGetTaskCountersOptions = CustomUseQueryOptions<
  MaybeUndefined<GetTaskCountersRequest>,
  GetTaskCountersResponse
>

export const useGetTaskCounters = (
  args?: GetTaskCountersRequest,
  options?: UseGetTaskCountersOptions,
): UseGetTaskCountersResult => {
  const state = useGetTaskCountersQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getTaskCountersErrorMessage)
    }
  }, [state.error])

  return state
}
