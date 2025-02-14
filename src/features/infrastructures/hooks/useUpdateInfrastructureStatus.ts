import {
  UpdateInfrastructureStatusRequest,
  UpdateInfrastructureStatusResponse,
} from 'features/infrastructures/api/dto'
import { useUpdateInfrastructureStatusMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { updateInfrastructureStatusErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
        showErrorNotification(updateInfrastructureStatusErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
