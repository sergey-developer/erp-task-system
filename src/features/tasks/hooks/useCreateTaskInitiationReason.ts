import { createTaskInitiationReasonErrorMessage } from 'features/tasks/api/constants'
import { useCreateTaskInitiationReasonMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import {
  CreateTaskInitiationReasonRequest,
  CreateTaskInitiationReasonResponse,
} from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInitiationReasonResult = CustomUseMutationResult<
  CreateTaskInitiationReasonRequest,
  CreateTaskInitiationReasonResponse
>

export const useCreateTaskInitiationReason = (): UseCreateInitiationReasonResult => {
  const [mutation, state] = useCreateTaskInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createTaskInitiationReasonErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
