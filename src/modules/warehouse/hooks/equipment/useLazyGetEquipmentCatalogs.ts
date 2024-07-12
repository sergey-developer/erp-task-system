import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentCatalogListErrMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentCatalogListQueryArgs,
  GetEquipmentCatalogListSuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetEquipmentCatalogListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCatalogListResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetEquipmentCatalogListQueryArgs>,
  GetEquipmentCatalogListSuccessResponse
>

export const useLazyGetEquipmentCatalogs = (): UseGetEquipmentCatalogListResult => {
  const [trigger, state] = useLazyGetEquipmentCatalogListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentCatalogListErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
