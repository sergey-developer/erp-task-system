import { useUpdateInventorizationEquipmentMutation } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  UpdateInventorizationEquipmentRequest,
  UpdateInventorizationEquipmentResponse,
} from 'features/warehouse/models'
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

import { updateInventorizationEquipmentErrorMessage } from '../api/constants'

type UseUpdateInventorizationEquipmentResult = CustomUseMutationResult<
  UpdateInventorizationEquipmentRequest,
  UpdateInventorizationEquipmentResponse
>

export const useUpdateInventorizationEquipment = (): UseUpdateInventorizationEquipmentResult => {
  const [mutation, state] = useUpdateInventorizationEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInventorizationEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
