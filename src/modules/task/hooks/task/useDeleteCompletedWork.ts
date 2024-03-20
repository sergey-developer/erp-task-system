import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteCompletedWorkErrMsg } from 'modules/task/constants/task'
import {
  DeleteCompletedWorkMutationArgs,
  DeleteCompletedWorkSuccessResponse,
} from 'modules/task/models'
import { useDeleteCompletedWorkMutation } from 'modules/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteCompletedWorkResult = CustomUseMutationResult<
  DeleteCompletedWorkMutationArgs,
  DeleteCompletedWorkSuccessResponse
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
