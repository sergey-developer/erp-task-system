import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createReclassificationRequestErrMsg } from 'features/task/constants/taskReclassificationRequest'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
} from 'features/task/models'
import { useCreateReclassificationRequestMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskReclassificationRequestResult = CustomUseMutationResult<
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse
>

export const useCreateTaskReclassificationRequest =
  (): UseCreateTaskReclassificationRequestResult => {
    const [mutation, state] = useCreateReclassificationRequestMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createReclassificationRequestErrMsg)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
