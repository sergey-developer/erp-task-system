import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationEquipmentErrMsg } from 'features/warehouse/constants/inventorization'
import {
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentSuccessResponse,
} from 'features/warehouse/models'
import { useGetInventorizationEquipmentQuery } from 'features/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationEquipmentResult = CustomUseQueryHookResult<
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentSuccessResponse
>

type UseGetInventorizationEquipmentOptions = CustomUseQueryOptions<
  GetInventorizationEquipmentQueryArgs,
  GetInventorizationEquipmentSuccessResponse
>

export const useGetInventorizationEquipment = (
  args: GetInventorizationEquipmentQueryArgs,
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
