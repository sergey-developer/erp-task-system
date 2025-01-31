import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getReclassificationRequestErrMsg } from 'features/task/constants/taskReclassificationRequest'
import {
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
} from 'features/task/models'
import { useGetReclassificationRequestQuery } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskReclassificationRequestResult = CustomUseQueryHookResult<
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse
>

type UseGetTaskReclassificationRequestOptions = CustomUseQueryOptions<
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse
>

export const useGetTaskReclassificationRequest = (
  args: GetTaskReclassificationRequestQueryArgs,
  options?: UseGetTaskReclassificationRequestOptions,
): UseGetTaskReclassificationRequestResult => {
  const state = useGetReclassificationRequestQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getReclassificationRequestErrMsg)
      }
    }
  }, [state.error])

  return state
}
