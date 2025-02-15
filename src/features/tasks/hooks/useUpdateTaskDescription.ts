import { updateTaskDescriptionErrorMessage } from 'features/tasks/api/constants'
import { useUpdateTaskDescriptionMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  UpdateTaskDescriptionRequest,
  UpdateTaskDescriptionResponse,
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

type UseUpdateTaskDescriptionResult = CustomUseMutationResult<
  UpdateTaskDescriptionRequest,
  UpdateTaskDescriptionResponse
>

export const useUpdateTaskDescription = (): UseUpdateTaskDescriptionResult => {
  const [mutation, state] = useUpdateTaskDescriptionMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateTaskDescriptionErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
