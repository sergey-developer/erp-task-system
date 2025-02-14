import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationTaskMessages } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationTaskRequest,
  GetRelocationTaskResponse,
} from 'features/warehouse/models'
import { useGetRelocationTaskQuery } from 'features/warehouse/services/relocationTaskApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationTaskResult = CustomUseQueryHookResult<
  GetRelocationTaskRequest,
  GetRelocationTaskResponse
>

type UseGetRelocationTaskOptions = CustomUseQueryOptions<
  GetRelocationTaskRequest,
  GetRelocationTaskResponse
>

export const useGetRelocationTask = (
  args: GetRelocationTaskRequest,
  options?: UseGetRelocationTaskOptions,
): UseGetRelocationTaskResult => {
  const state = useGetRelocationTaskQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getRelocationTaskMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
