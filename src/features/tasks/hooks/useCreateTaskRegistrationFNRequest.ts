import { useCreateTaskRegistrationFNRequestMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { createTaskRegistrationFNRequestErrorMessage } from 'features/tasks/api/constants'
import {
  CreateTaskRegistrationFNRequestRequest,
  CreateTaskRegistrationFNRequestResponse,
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

type UseCreateTaskRegistrationFNRequestResult = CustomUseMutationResult<
  CreateTaskRegistrationFNRequestRequest,
  CreateTaskRegistrationFNRequestResponse
>

export const useCreateTaskRegistrationFNRequest = (): UseCreateTaskRegistrationFNRequestResult => {
  const [mutation, state] = useCreateTaskRegistrationFNRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskRegistrationFNRequestErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
