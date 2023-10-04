import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentCatalogListMessages } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetEquipmentCatalogListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCatalogListResult = CustomUseQueryHookResult<
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse
>

type UseGetEquipmentCatalogListOptions = CustomUseQueryOptions<
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse
>

export const useGetEquipmentCatalogList = (
  args?: GetEquipmentCatalogListQueryArgs,
  options?: UseGetEquipmentCatalogListOptions,
): UseGetEquipmentCatalogListResult => {
  const state = useGetEquipmentCatalogListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentCatalogListMessages.commonError)
    }
  }, [state.error])

  return state
}
