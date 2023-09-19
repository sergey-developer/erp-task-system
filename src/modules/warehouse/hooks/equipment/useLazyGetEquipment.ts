import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentMessages } from 'modules/warehouse/constants/equipment'
import { GetEquipmentQueryArgs, GetEquipmentSuccessResponse } from 'modules/warehouse/models'
import { useLazyGetEquipmentQuery } from 'modules/warehouse/services/equipmentApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentResult = CustomUseLazyQueryHookResult<
  GetEquipmentQueryArgs,
  GetEquipmentSuccessResponse
>

export const useLazyGetEquipment = (): UseGetEquipmentResult => {
  const [trigger, state] = useLazyGetEquipmentQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getEquipmentMessages.commonError)
      }
    }
  }, [state.error])

  return [trigger, state]
}
