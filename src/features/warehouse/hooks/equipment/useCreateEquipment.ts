import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentErrMsg } from 'features/warehouse/constants/equipment'
import {
  CreateEquipmentMutationArgs,
  CreateEquipmentSuccessResponse,
} from 'features/warehouse/models'
import { useCreateEquipmentMutation } from 'features/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateEquipmentResult = CustomUseMutationResult<
  CreateEquipmentMutationArgs,
  CreateEquipmentSuccessResponse
>

export const useCreateEquipment = (): UseCreateEquipmentResult => {
  const [mutation, state] = useCreateEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
