import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createSuspendRequestErrMsg } from 'modules/task/constants/taskSuspendRequest'
import {
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse,
} from 'modules/task/models'
import { useCreateSuspendRequestMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskSuspendRequestResult = CustomUseMutationResult<
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse
>

export const useCreateTaskSuspendRequest = (): UseCreateTaskSuspendRequestResult => {
  const [mutation, state] = useCreateSuspendRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createSuspendRequestErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
