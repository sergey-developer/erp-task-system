import { useEffect } from 'react'

import {
  CustomUseQueryHookResult,
  CustomUseQueryOptions,
} from 'lib/rtk-query/types'

import {
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse,
} from 'modules/task/models'
import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'

import { commonApiMessages } from 'shared/constants/errors'
import { isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskCountersResult = CustomUseQueryHookResult<
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse
>

export const useGetTaskCounters = (
  options?: CustomUseQueryOptions<
    GetTaskCountersQueryArgs,
    GetTaskCountersSuccessResponse
  >,
): UseGetTaskCountersResult => {
  const state = useGetTaskCountersQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return state
}
