import { createEquipmentsErrorMessage } from 'features/equipments/api/constants'
import { useCreateEquipmentsMutation } from 'features/equipments/api/endpoints/equipments.endpoints'
import { CreateEquipmentsRequest, CreateEquipmentsResponse } from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentsResult = CustomUseMutationResult<
  CreateEquipmentsRequest,
  CreateEquipmentsResponse
>

export const useCreateEquipments = (): UseCreateEquipmentsResult => {
  const [mutation, state] = useCreateEquipmentsMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentsErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
