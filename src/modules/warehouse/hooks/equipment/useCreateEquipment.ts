import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createEquipmentErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentMutationArgs,
  CreateEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
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
        showErrorNotification(createEquipmentErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
