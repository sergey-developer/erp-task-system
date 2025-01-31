import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationEquipmentsErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'features/warehouse/models/inventorization'
import { useGetInventorizationEquipmentsQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsTransformedSuccessResponse } from 'features/warehouse/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetInventorizationEquipmentsResult = CustomUseQueryHookResult<
  GetInventorizationEquipmentsQueryArgs,
  GetInventorizationEquipmentsTransformedSuccessResponse
>

type UseGetInventorizationEquipmentsOptions = CustomUseQueryOptions<
  GetInventorizationEquipmentsQueryArgs,
  GetInventorizationEquipmentsTransformedSuccessResponse
>

export const useGetInventorizationEquipments = (
  args: GetInventorizationEquipmentsQueryArgs,
  options?: UseGetInventorizationEquipmentsOptions,
): UseGetInventorizationEquipmentsResult => {
  const state = useGetInventorizationEquipmentsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getInventorizationEquipmentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
