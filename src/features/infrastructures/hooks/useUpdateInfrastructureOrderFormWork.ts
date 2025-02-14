import {
  UpdateInfrastructureOrderFormWorkRequest,
  UpdateInfrastructureOrderFormWorkResponse,
} from 'features/infrastructures/api/dto'
import { useUpdateInfrastructureOrderFormWorkMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { updateInfrastructureOrderFormWorkErrorMessage } from 'features/infrastructures/constants'
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
