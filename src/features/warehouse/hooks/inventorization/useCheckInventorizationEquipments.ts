import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { checkInventorizationEquipmentsErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsMutationArgs,
  CheckInventorizationEquipmentsSuccessResponse,
} from 'features/warehouse/models'
import { useCheckInventorizationEquipmentsMutation } from 'features/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCheckInventorizationEquipmentsResult = CustomUseMutationResult<
  CheckInventorizationEquipmentsMutationArgs,
  CheckInventorizationEquipmentsSuccessResponse
>

export const useCheckInventorizationEquipments = (): UseCheckInventorizationEquipmentsResult => {
  const [mutation, state] = useCheckInventorizationEquipmentsMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(checkInventorizationEquipmentsErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
