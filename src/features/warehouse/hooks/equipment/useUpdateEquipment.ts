import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateEquipmentErrMsg } from 'features/warehouse/constants/equipment'
import {
  UpdateEquipmentMutationArgs,
  UpdateEquipmentSuccessResponse,
} from 'features/warehouse/models'
import { useUpdateEquipmentMutation } from 'features/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateEquipmentResult = CustomUseMutationResult<
  UpdateEquipmentMutationArgs,
  UpdateEquipmentSuccessResponse
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
        showErrorNotification(updateEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
