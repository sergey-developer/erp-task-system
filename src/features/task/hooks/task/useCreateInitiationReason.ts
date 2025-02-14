import { createInitiationReasonErrorMessage } from 'features/task/constants/task'
import { CreateInitiationReasonRequest, CreateInitiationReasonResponse } from 'features/task/models'
import { useCreateInitiationReasonMutation } from 'features/task/services/taskApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInitiationReasonResult = CustomUseMutationResult<
  CreateInitiationReasonRequest,
  CreateInitiationReasonResponse
>

export const useCreateInitiationReason = (): UseCreateInitiationReasonResult => {
  const [mutation, state] = useCreateInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInitiationReasonErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
