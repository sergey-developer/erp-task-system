import { updateInventorizationEquipmentErrMsg } from 'features/warehouse/constants/inventorization'
import {
  UpdateInventorizationEquipmentRequest,
  UpdateInventorizationEquipmentResponse,
} from 'features/warehouse/models'
import { useUpdateInventorizationEquipmentMutation } from 'features/warehouse/services/inventorizationApi.service'
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

type UseUpdateInventorizationEquipmentResult = CustomUseMutationResult<
  UpdateInventorizationEquipmentRequest,
  UpdateInventorizationEquipmentResponse
>

export const useUpdateInventorizationEquipment = (): UseUpdateInventorizationEquipmentResult => {
  const [mutation, state] = useUpdateInventorizationEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInventorizationEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
