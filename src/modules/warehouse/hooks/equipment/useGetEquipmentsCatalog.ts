import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentsCatalogErrMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentsCatalogQueryArgs,
  GetEquipmentsCatalogSuccessResponse,
} from 'modules/warehouse/models'
import { useGetEquipmentCatalogListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetEquipmentsCatalogQueryArgs>,
  GetEquipmentsCatalogSuccessResponse
>

type UseGetEquipmentsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetEquipmentsCatalogQueryArgs>,
  GetEquipmentsCatalogSuccessResponse
>

export const useGetEquipmentsCatalog = (
  args?: GetEquipmentsCatalogQueryArgs,
  options?: UseGetEquipmentsCatalogOptions,
): UseGetEquipmentsCatalogResult => {
  const state = useGetEquipmentCatalogListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsCatalogErrMsg)
      }
    }
  }, [state.error])

  return state
}
