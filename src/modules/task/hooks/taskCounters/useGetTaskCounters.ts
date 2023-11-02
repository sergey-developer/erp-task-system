import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { GetTaskCountersQueryArgs, GetTaskCountersSuccessResponse } from 'modules/task/models'
import { useGetTaskCountersQuery } from 'modules/task/services/taskApi.service'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse } from 'shared/services/baseApi'
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
      showErrorNotification(commonApiMessages.unknownError)
    }
  }, [state.error])

  return state
}
