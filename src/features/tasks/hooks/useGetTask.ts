import { useGetTaskQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import { getTaskErrorMessage } from 'features/tasks/api/constants'
import {
  makeGetTaskNotFoundErrorMessage,
  makeGetTaskServerErrorMessage,
} from 'features/tasks/api/helpers'
import { GetTaskRequest, GetTaskResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskResult = CustomUseQueryHookResult<GetTaskRequest, GetTaskResponse>
type UseGetTaskOptions = CustomUseQueryOptions<GetTaskRequest, GetTaskResponse>

export const useGetTask = (id: GetTaskRequest, options?: UseGetTaskOptions): UseGetTaskResult => {
  const state = useGetTaskQuery(id, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(makeGetTaskNotFoundErrorMessage(id))
      } else if (isBadRequestError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(makeGetTaskServerErrorMessage(id))
      } else {
        showErrorNotification(getTaskErrorMessage)
      }
    }
  }, [id, state.error])

  return state
}
