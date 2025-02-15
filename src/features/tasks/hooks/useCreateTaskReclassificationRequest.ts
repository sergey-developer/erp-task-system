import { createTaskReclassificationRequestErrorMessage } from 'features/tasks/api/constants'
import { useCreateTaskReclassificationRequestMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  CreateTaskReclassificationRequestRequest,
  CreateTaskReclassificationRequestResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateTaskReclassificationRequestResult = CustomUseMutationResult<
  CreateTaskReclassificationRequestRequest,
  CreateTaskReclassificationRequestResponse
>

export const useCreateTaskReclassificationRequest =
  (): UseCreateTaskReclassificationRequestResult => {
    const [mutation, state] = useCreateTaskReclassificationRequestMutation()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(createTaskReclassificationRequestErrorMessage)
        }
      }
    }, [state.error])

    return [mutation, state]
  }
