import { getEquipmentsCatalogErrMsg } from 'features/equipments/api/constants'
import { useLazyGetEquipmentsCatalogQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentsCatalogRequest, GetEquipmentsCatalogResponse } from '../api/schemas'

type UseGetEquipmentCatalogListResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetEquipmentsCatalogRequest>,
  GetEquipmentsCatalogResponse
>

export const useLazyGetEquipmentCatalogs = (): UseGetEquipmentCatalogListResult => {
  const [trigger, state] = useLazyGetEquipmentsCatalogQuery()

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
