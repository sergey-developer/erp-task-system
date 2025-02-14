import { useGetRelocationTaskQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getRelocationTaskErrorMessage } from '../api/constants'
import { GetRelocationTaskRequest, GetRelocationTaskResponse } from '../api/schemas'

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
        showErrorNotification(getRelocationTaskErrorMessage)
      }
    }
  }, [state.error])

  return state
}
