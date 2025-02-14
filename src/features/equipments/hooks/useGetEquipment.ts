import { getEquipmentErrMsg } from 'features/equipments/api/constants'
import { useGetEquipmentQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentRequest, GetEquipmentResponse } from '../api/schemas'

type UseGetEquipmentResult = CustomUseQueryHookResult<GetEquipmentRequest, GetEquipmentResponse>

type UseGetEquipmentOptions = CustomUseQueryOptions<GetEquipmentRequest, GetEquipmentResponse>

export const useGetEquipment = (
  args: GetEquipmentRequest,
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
        showErrorNotification(getEquipmentErrMsg)
      }
    }
  }, [state.error])

  return state
}
