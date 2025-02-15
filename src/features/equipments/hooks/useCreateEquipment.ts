import { createEquipmentErrorMessage } from 'features/equipments/api/constants'
import { useCreateEquipmentMutation } from 'features/equipments/api/endpoints/equipments.endpoints'
import { CreateEquipmentRequest, CreateEquipmentResponse } from 'features/equipments/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentResult = CustomUseMutationResult<
  CreateEquipmentRequest,
  CreateEquipmentResponse
>

export const useCreateEquipment = (): UseCreateEquipmentResult => {
  const [mutation, state] = useCreateEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
