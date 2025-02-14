import { checkInventorizationEquipmentsErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CheckInventorizationEquipmentsRequest,
  CheckInventorizationEquipmentsResponse,
} from 'features/warehouse/models'
import { useCheckInventorizationEquipmentsMutation } from 'features/warehouse/services/inventorizationApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCheckInventorizationEquipmentsResult = CustomUseMutationResult<
  CheckInventorizationEquipmentsRequest,
  CheckInventorizationEquipmentsResponse
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
