import { deleteTaskInitiationReasonErrorMessage } from 'features/tasks/api/constants'
import { useDeleteTaskInitiationReasonMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  DeleteTaskInitiationReasonRequest,
  DeleteTaskInitiationReasonResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteInitiationReasonResult = CustomUseMutationResult<
  DeleteTaskInitiationReasonRequest,
  DeleteTaskInitiationReasonResponse
>

export const useDeleteTaskInitiationReason = (): UseDeleteInitiationReasonResult => {
  const [mutation, state] = useDeleteTaskInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteTaskInitiationReasonErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
