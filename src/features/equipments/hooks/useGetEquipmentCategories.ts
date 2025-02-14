import { getEquipmentCategoriesErrMsg } from 'features/equipments/api/constants'
import { useGetEquipmentCategoriesQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import {
  GetEquipmentCategoriesRequest,
  GetEquipmentCategoriesResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCategoriesResult = CustomUseQueryHookResult<
  GetEquipmentCategoriesRequest,
  GetEquipmentCategoriesResponse
>

type UseGetEquipmentCategoriesOptions = CustomUseQueryOptions<
  GetEquipmentCategoriesRequest,
  GetEquipmentCategoriesResponse
>

export const useGetEquipmentCategories = (
  args?: GetEquipmentCategoriesRequest,
  options?: UseGetEquipmentCategoriesOptions,
): UseGetEquipmentCategoriesResult => {
  const state = useGetEquipmentCategoriesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentCategoriesErrMsg)
    }
  }, [state.error])

  return state
}
