import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentMessages } from 'features/warehouse/constants/equipment'
import { GetEquipmentQueryArgs, GetEquipmentSuccessResponse } from 'features/warehouse/models'
import { useLazyGetEquipmentQuery } from 'features/warehouse/services/equipmentApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentResult = CustomUseLazyQueryHookResult<
  GetEquipmentQueryArgs,
  GetEquipmentSuccessResponse
>

export const useLazyGetEquipment = (): UseGetEquipmentResult => {
  const [trigger, state] = useLazyGetEquipmentQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentMessages.commonError)
      }
    }
  }, [state.error])

  return [trigger, state]
}
