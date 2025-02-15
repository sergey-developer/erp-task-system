import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { updateInfrastructureOrderFormWorkErrorMessage } from '../api/constants'
import { useUpdateInfrastructureOrderFormWorkMutation } from '../api/endpoints/infrastructures.endpoints'
import {
  UpdateInfrastructureOrderFormWorkRequest,
  UpdateInfrastructureOrderFormWorkResponse,
} from '../api/schemas'

type UseUpdateInfrastructureOrderFormWork = CustomUseMutationResult<
  UpdateInfrastructureOrderFormWorkRequest,
  UpdateInfrastructureOrderFormWorkResponse
>

export const useUpdateInfrastructureOrderFormWork = (): UseUpdateInfrastructureOrderFormWork => {
  const [mutation, state] = useUpdateInfrastructureOrderFormWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInfrastructureOrderFormWorkErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
