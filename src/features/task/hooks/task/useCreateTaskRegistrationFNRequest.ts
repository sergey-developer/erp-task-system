import { createTaskRegistrationFNRequestErrMsg } from 'features/task/constants/task'
import {
  CreateTaskRegistrationFNRequestRequest,
  CreateTaskRegistrationFNRequestResponse,
} from 'features/task/models'
import { useCreateTaskRegistrationFNRequestMutation } from 'features/task/services/taskApi.service'
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
        showErrorNotification(createTaskRegistrationFNRequestErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
