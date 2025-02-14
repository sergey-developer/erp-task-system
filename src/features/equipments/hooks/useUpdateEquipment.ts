import { updateEquipmentErrorMessage } from 'features/equipments/api/constants'
import { useUpdateEquipmentMutation } from 'features/equipments/api/endpoints/equipments.endpoints'
import { UpdateEquipmentRequest, UpdateEquipmentResponse } from 'features/warehouse/models'
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

type UseUpdateEquipmentResult = CustomUseMutationResult<
  UpdateEquipmentRequest,
  UpdateEquipmentResponse
>

export const useUpdateEquipment = (): UseUpdateEquipmentResult => {
  const [mutation, state] = useUpdateEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
