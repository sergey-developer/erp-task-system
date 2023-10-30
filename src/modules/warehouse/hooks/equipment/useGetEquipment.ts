import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentMessages } from 'modules/warehouse/constants/equipment'
import { GetEquipmentQueryArgs, GetEquipmentSuccessResponse } from 'modules/warehouse/models'
import { useGetEquipmentQuery } from 'modules/warehouse/services/equipmentApiService/equipmentApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentResult = CustomUseQueryHookResult<
  GetEquipmentQueryArgs,
  GetEquipmentSuccessResponse
>

type UseGetEquipmentOptions = CustomUseQueryOptions<
  GetEquipmentQueryArgs,
  GetEquipmentSuccessResponse
>

export const useGetEquipment = (
  args: GetEquipmentQueryArgs,
  options?: UseGetEquipmentOptions,
): UseGetEquipmentResult => {
  const state = useGetEquipmentQuery(args, options)

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

  return state
}
