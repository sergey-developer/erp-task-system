import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { deleteInitiationReasonErrMsg } from 'features/task/constants/task'
import {
  DeleteInitiationReasonMutationArgs,
  DeleteInitiationReasonSuccessResponse,
} from 'features/task/models'
import { useDeleteInitiationReasonMutation } from 'features/task/services/taskApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteInitiationReasonResult = CustomUseMutationResult<
  DeleteInitiationReasonMutationArgs,
  DeleteInitiationReasonSuccessResponse
>

export const useDeleteInitiationReason = (): UseDeleteInitiationReasonResult => {
  const [mutation, state] = useDeleteInitiationReasonMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(deleteInitiationReasonErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
