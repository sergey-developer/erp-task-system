import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentCatalogListErrMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetEquipmentCatalogListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCatalogListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetEquipmentCatalogListQueryArgs>,
  GetEquipmentCatalogListSuccessResponse
>

type UseGetEquipmentCatalogListOptions = CustomUseQueryOptions<
  MaybeUndefined<GetEquipmentCatalogListQueryArgs>,
  GetEquipmentCatalogListSuccessResponse
>

export const useGetEquipmentCatalogList = (
  args?: GetEquipmentCatalogListQueryArgs,
  options?: UseGetEquipmentCatalogListOptions,
): UseGetEquipmentCatalogListResult => {
  const state = useGetEquipmentCatalogListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentCatalogListErrMsg)
    }
  }, [state.error])

  return state
}
