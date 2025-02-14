import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskErrMsg } from 'features/task/constants/task'
import { GetTaskRequest, GetTaskResponse } from 'features/task/models'
import { useGetTaskQuery } from 'features/task/services/taskApi.service'
import { getTaskNotFoundErrMsg, getTaskServerErrMsg } from 'features/task/utils/task'

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
        showErrorNotification(getTaskNotFoundErrMsg(id))
      } else if (isBadRequestError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(getTaskServerErrMsg(id))
      } else {
        showErrorNotification(getTaskErrMsg)
      }
    }
  }, [id, state.error])

  return state
}
