import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { checkInventorizationEquipmentsErrMsg } from 'modules/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsMutationArgs,
  CheckInventorizationEquipmentsSuccessResponse,
} from 'modules/warehouse/models'
import { useCheckInventorizationEquipmentsMutation } from 'modules/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
