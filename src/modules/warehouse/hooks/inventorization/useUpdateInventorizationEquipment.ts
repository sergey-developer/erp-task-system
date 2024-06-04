import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateInventorizationEquipmentErrMsg } from 'modules/warehouse/constants/inventorization'
import {
  UpdateInventorizationEquipmentMutationArgs,
  UpdateInventorizationEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import { useUpdateInventorizationEquipmentMutation } from 'modules/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateInventorizationEquipmentResult = CustomUseMutationResult<
  UpdateInventorizationEquipmentMutationArgs,
  UpdateInventorizationEquipmentSuccessResponse
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
