import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getInventorizationEquipmentsErrMsg } from 'modules/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsQueryArgs } from 'modules/warehouse/models/inventorization'
import { useGetInventorizationEquipmentsQuery } from 'modules/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsTransformedSuccessResponse } from 'modules/warehouse/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
