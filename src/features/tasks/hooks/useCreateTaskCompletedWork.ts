import { createTaskCompletedWorkErrorMessage } from 'features/tasks/api/constants'
import { useCreateTaskCompletedWorkMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  CreateTaskCompletedWorkRequest,
  CreateTaskCompletedWorkResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateCompletedWorkResult = CustomUseMutationResult<
  CreateTaskCompletedWorkRequest,
  CreateTaskCompletedWorkResponse
>

export const useCreateTaskCompletedWork = (): UseCreateCompletedWorkResult => {
  const [mutation, state] = useCreateTaskCompletedWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskCompletedWorkErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
