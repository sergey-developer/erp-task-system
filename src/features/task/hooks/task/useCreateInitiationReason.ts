import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInitiationReasonErrMsg } from 'features/task/constants/task'
import {
  CreateInitiationReasonMutationArgs,
  CreateInitiationReasonSuccessResponse,
} from 'features/task/models'
import { useCreateInitiationReasonMutation } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInitiationReasonResult = CustomUseMutationResult<
  CreateInitiationReasonMutationArgs,
  CreateInitiationReasonSuccessResponse
>

export const useCreateInitiationReason = (): UseCreateInitiationReasonResult => {
  const [mutation, state] = useCreateInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInitiationReasonErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
