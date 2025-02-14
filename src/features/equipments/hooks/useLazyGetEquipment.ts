import { getEquipmentErrorMessage } from 'features/equipments/api/constants'
import { useLazyGetEquipmentQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentRequest, GetEquipmentResponse } from '../api/schemas'

type UseGetEquipmentResult = CustomUseLazyQueryHookResult<GetEquipmentRequest, GetEquipmentResponse>

export const useLazyGetEquipment = (): UseGetEquipmentResult => {
  const [trigger, state] = useLazyGetEquipmentQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
