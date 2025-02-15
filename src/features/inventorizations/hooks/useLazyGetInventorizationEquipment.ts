import { useLazyGetInventorizationEquipmentQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse,
} from 'features/inventorizations/api/schemas'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInventorizationEquipmentErrorMessage } from '../api/constants'

type UseLazyGetInventorizationEquipmentResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse
>

export const useLazyGetInventorizationEquipment = (): UseLazyGetInventorizationEquipmentResult => {
  const [trigger, state] = useLazyGetInventorizationEquipmentQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
