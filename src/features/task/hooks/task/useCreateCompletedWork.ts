import { createCompletedWorkErrMsg } from 'features/task/constants/task'
import {
  CreateTaskCompletedWorkRequest,
  CreateTaskCompletedWorkResponse,
} from 'features/task/models'
import { useCreateCompletedWorkMutation } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateCompletedWorkResult = CustomUseMutationResult<
  CreateTaskCompletedWorkRequest,
  CreateTaskCompletedWorkResponse
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
