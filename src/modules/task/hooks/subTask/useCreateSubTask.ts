import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createSubTaskErrMsg } from 'modules/task/constants/task'
import { CreateSubTaskMutationArgs, CreateSubTaskSuccessResponse } from 'modules/task/models'
import { useCreateSubTaskMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateSubTaskResult = CustomUseMutationResult<
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse
>

export const useCreateSubTask = (): UseCreateSubTaskResult => {
  const [mutation, state] = useCreateSubTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createSubTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
