import { deleteCompletedWorkErrMsg } from 'features/task/constants/task'
import {
  DeleteCompletedWorkRequest,
  DeleteCompletedWorkResponse,
} from 'features/task/models'
import { useDeleteCompletedWorkMutation } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteCompletedWorkResult = CustomUseMutationResult<
  DeleteCompletedWorkRequest,
  DeleteCompletedWorkResponse
>

export const useDeleteCompletedWork = (): UseDeleteCompletedWorkResult => {
  const [mutation, state] = useDeleteCompletedWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteCompletedWorkErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
