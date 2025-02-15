import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { updateInfrastructureStatusErrorMessage } from '../api/constants'
import { useUpdateInfrastructureStatusMutation } from '../api/endpoints/infrastructures.endpoints'
import {
  UpdateInfrastructureStatusRequest,
  UpdateInfrastructureStatusResponse,
} from '../api/schemas'

type UseUpdateInfrastructureStatusResult = CustomUseMutationResult<
  UpdateInfrastructureStatusRequest,
  UpdateInfrastructureStatusResponse
>

export const useUpdateInfrastructureStatus = (): UseUpdateInfrastructureStatusResult => {
  const [mutation, state] = useUpdateInfrastructureStatusMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInfrastructureStatusErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
