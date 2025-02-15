import { deleteTaskCompletedWorkErrorMessage } from 'features/tasks/api/constants'
import { useDeleteTaskCompletedWorkMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  DeleteTaskCompletedWorkRequest,
  DeleteTaskCompletedWorkResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteCompletedWorkResult = CustomUseMutationResult<
  DeleteTaskCompletedWorkRequest,
  DeleteTaskCompletedWorkResponse
>

export const useDeleteTaskCompletedWork = (): UseDeleteCompletedWorkResult => {
  const [mutation, state] = useDeleteTaskCompletedWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteTaskCompletedWorkErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
