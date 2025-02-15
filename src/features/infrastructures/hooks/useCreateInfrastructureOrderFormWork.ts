import { createInfrastructureOrderFormWorkErrorMessage } from 'features/infrastructures/api/constants'
import { useCreateInfrastructureOrderFormWorkMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import {
  CreateInfrastructureOrderFormWorkRequest,
  CreateInfrastructureOrderFormWorkResponse,
} from 'features/infrastructures/api/schemas'
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

type UseCreateInfrastructureOrderFormWork = CustomUseMutationResult<
  CreateInfrastructureOrderFormWorkRequest,
  CreateInfrastructureOrderFormWorkResponse
>

export const useCreateInfrastructureOrderFormWork = (): UseCreateInfrastructureOrderFormWork => {
  const [mutation, state] = useCreateInfrastructureOrderFormWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInfrastructureOrderFormWorkErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
