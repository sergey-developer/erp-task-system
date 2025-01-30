import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInventorizationEquipmentErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CreateInventorizationEquipmentMutationArgs,
  CreateInventorizationEquipmentSuccessResponse,
} from 'features/warehouse/models'
import { useCreateInventorizationEquipmentMutation } from 'features/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInventorizationEquipmentResult = CustomUseMutationResult<
  CreateInventorizationEquipmentMutationArgs,
  CreateInventorizationEquipmentSuccessResponse
>

export const useCreateInventorizationEquipment = (): UseCreateInventorizationEquipmentResult => {
  const [mutation, state] = useCreateInventorizationEquipmentMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInventorizationEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
