import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskDescriptionErrMsg } from 'modules/task/constants/task'
import {
  UpdateTaskDescriptionMutationArgs,
  UpdateTaskDescriptionSuccessResponse,
} from 'modules/task/models'
import { useUpdateTaskDescriptionMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
