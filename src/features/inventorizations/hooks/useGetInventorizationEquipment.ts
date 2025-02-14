import { useGetInventorizationEquipmentQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getInventorizationEquipmentErrMsg } from '../api/constants'

type UseGetInventorizationEquipmentResult = CustomUseQueryHookResult<
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse
>

type UseGetInventorizationEquipmentOptions = CustomUseQueryOptions<
  GetInventorizationEquipmentRequest,
  GetInventorizationEquipmentResponse
>

export const useGetInventorizationEquipment = (
  args: GetInventorizationEquipmentRequest,
  options?: UseGetInventorizationEquipmentOptions,
): UseGetInventorizationEquipmentResult => {
  const state = useGetInventorizationEquipmentQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationEquipmentErrMsg)
      }
    }
  }, [state.error])

  return state
}
