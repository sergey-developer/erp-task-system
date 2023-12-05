import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentsErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentsMutationArgs,
  CreateEquipmentsSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateEquipmentsMutation } from 'modules/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentsResult = CustomUseMutationResult<
  CreateEquipmentsMutationArgs,
  CreateEquipmentsSuccessResponse
>

export const useCreateEquipments = (): UseCreateEquipmentsResult => {
  const [mutation, state] = useCreateEquipmentsMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentsErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
