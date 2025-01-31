import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskDescriptionErrMsg } from 'features/task/constants/task'
import {
  UpdateTaskDescriptionMutationArgs,
  UpdateTaskDescriptionSuccessResponse,
} from 'features/task/models'
import { useUpdateTaskDescriptionMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateTaskDescriptionResult = CustomUseMutationResult<
  UpdateTaskDescriptionMutationArgs,
  UpdateTaskDescriptionSuccessResponse
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
        showErrorNotification(updateTaskDescriptionErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
