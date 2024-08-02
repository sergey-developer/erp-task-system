import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInventorizationEquipmentErrMsg } from 'modules/warehouse/constants/inventorization'
import {
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetInventorizationEquipmentQuery } from 'modules/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetInventorizationEquipmentResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentSuccessResponse
>

export const useLazyGetInventorizationEquipment = (): UseLazyGetInventorizationEquipmentResult => {
  const [trigger, state] = useLazyGetInventorizationEquipmentQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationEquipmentErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
