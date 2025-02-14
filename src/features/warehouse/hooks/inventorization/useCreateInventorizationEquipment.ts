import { createInventorizationEquipmentErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CreateInventorizationEquipmentRequest,
  CreateInventorizationEquipmentResponse,
} from 'features/warehouse/models'
import { useCreateInventorizationEquipmentMutation } from 'features/warehouse/services/inventorizationApi.service'
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
        showErrorNotification(createInventorizationEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
