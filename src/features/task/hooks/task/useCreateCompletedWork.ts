import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createCompletedWorkErrMsg } from 'features/task/constants/task'
import {
  CreateTaskCompletedWorkMutationArgs,
  CreateTaskCompletedWorkSuccessResponse,
} from 'features/task/models'
import { useCreateCompletedWorkMutation } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateCompletedWorkResult = CustomUseMutationResult<
  CreateTaskCompletedWorkMutationArgs,
  CreateTaskCompletedWorkSuccessResponse
>

export const useCreateCompletedWork = (): UseCreateCompletedWorkResult => {
  const [mutation, state] = useCreateCompletedWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createCompletedWorkErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
