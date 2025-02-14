import { deleteInitiationReasonErrorMessage } from 'features/task/constants/task'
import { DeleteInitiationReasonRequest, DeleteInitiationReasonResponse } from 'features/task/models'
import { useDeleteInitiationReasonMutation } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteInitiationReasonResult = CustomUseMutationResult<
  DeleteInitiationReasonRequest,
  DeleteInitiationReasonResponse
>

export const useDeleteInitiationReason = (): UseDeleteInitiationReasonResult => {
  const [mutation, state] = useDeleteInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteInitiationReasonErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
