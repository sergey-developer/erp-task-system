import { getTaskReclassificationRequestErrorMessage } from 'features/tasks/api/constants'
import { useGetTaskReclassificationRequestQuery } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  GetTaskReclassificationRequestRequest,
  GetTaskReclassificationRequestResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskReclassificationRequestResult = CustomUseQueryHookResult<
  GetTaskReclassificationRequestRequest,
  GetTaskReclassificationRequestResponse
>

type UseGetTaskReclassificationRequestOptions = CustomUseQueryOptions<
  GetTaskReclassificationRequestRequest,
  GetTaskReclassificationRequestResponse
>

export const useGetTaskReclassificationRequest = (
  args: GetTaskReclassificationRequestRequest,
  options?: UseGetTaskReclassificationRequestOptions,
): UseGetTaskReclassificationRequestResult => {
  const state = useGetTaskReclassificationRequestQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTaskReclassificationRequestErrorMessage)
      }
    }
  }, [state.error])

  return state
}
