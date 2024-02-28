import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTaskMessages } from 'modules/task/constants/task'
import { GetTaskQueryArgs, GetTaskSuccessResponse } from 'modules/task/models'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import { getTaskNotFoundErrorMsg, getTaskServerErrorMsg } from 'modules/task/utils/task'

import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskResult = CustomUseQueryHookResult<GetTaskQueryArgs, GetTaskSuccessResponse>
type UseGetTaskOptions = CustomUseQueryOptions<GetTaskQueryArgs, GetTaskSuccessResponse>

export const useGetTask = (id: GetTaskQueryArgs, options?: UseGetTaskOptions): UseGetTaskResult => {
  const state = useGetTaskQuery(id, options)

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getTaskNotFoundErrorMsg(id))
      } else if (isBadRequestError(state.error) || isServerRangeError(state.error)) {
        showErrorNotification(getTaskServerErrorMsg(id))
      } else {
        showErrorNotification(getTaskMessages.commonError)
      }
    }
  }, [id, state.error])

  return state
}
