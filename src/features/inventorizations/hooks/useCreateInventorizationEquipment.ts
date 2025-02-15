import { useCreateInventorizationEquipmentMutation } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  CreateInventorizationEquipmentRequest,
  CreateInventorizationEquipmentResponse,
} from 'features/inventorizations/api/schemas'
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

import { createInventorizationEquipmentErrorMessage } from '../api/constants'

type UseCreateInventorizationEquipmentResult = CustomUseMutationResult<
  CreateInventorizationEquipmentRequest,
  CreateInventorizationEquipmentResponse
>

export const useCreateInventorizationEquipment = (): UseCreateInventorizationEquipmentResult => {
  const [mutation, state] = useCreateInventorizationEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInventorizationEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
