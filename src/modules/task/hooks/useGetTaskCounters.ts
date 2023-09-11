import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { GetTaskCountersQueryArgs, GetTaskCountersSuccessResponse } from 'modules/task/models'
import { useGetTaskCountersQuery } from 'modules/task/services/taskApiService'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCountersResult = CustomUseQueryHookResult<
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse
>

type UseGetTaskCountersOptions = CustomUseQueryOptions<
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse
>

export const useGetTaskCounters = (
  options?: UseGetTaskCountersOptions,
): UseGetTaskCountersResult => {
  const state = useGetTaskCountersQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return state
}
