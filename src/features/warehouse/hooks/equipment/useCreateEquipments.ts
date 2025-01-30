import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentsErrMsg } from 'features/warehouse/constants/equipment'
import {
  CreateEquipmentsMutationArgs,
  CreateEquipmentsSuccessResponse,
} from 'features/warehouse/models'
import { useCreateEquipmentsMutation } from 'features/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/services/baseApi'
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
        showErrorNotification(createEquipmentsErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
