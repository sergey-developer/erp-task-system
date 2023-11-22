import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateEquipmentErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  UpdateEquipmentMutationArgs,
  UpdateEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import { useUpdateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
        showErrorNotification(updateEquipmentErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
