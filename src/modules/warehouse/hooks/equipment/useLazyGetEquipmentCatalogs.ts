import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentsCatalogErrMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentsCatalogQueryArgs,
  GetEquipmentsCatalogSuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetEquipmentCatalogListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCatalogListResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetEquipmentsCatalogQueryArgs>,
  GetEquipmentsCatalogSuccessResponse
>

export const useLazyGetEquipmentCatalogs = (): UseGetEquipmentCatalogListResult => {
  const [trigger, state] = useLazyGetEquipmentCatalogListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsCatalogErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
