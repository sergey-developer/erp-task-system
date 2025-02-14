import { getEquipmentsCatalogErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentsCatalogQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentsCatalogRequest, GetEquipmentsCatalogResponse } from '../api/schemas'

type UseGetEquipmentsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetEquipmentsCatalogRequest>,
  GetEquipmentsCatalogResponse
>

type UseGetEquipmentsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetEquipmentsCatalogRequest>,
  GetEquipmentsCatalogResponse
>

export const useGetEquipmentsCatalog = (
  args?: GetEquipmentsCatalogRequest,
  options?: UseGetEquipmentsCatalogOptions,
): UseGetEquipmentsCatalogResult => {
  const state = useGetEquipmentsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsCatalogErrorMessage)
      }
    }
  }, [state.error])

  return state
}
