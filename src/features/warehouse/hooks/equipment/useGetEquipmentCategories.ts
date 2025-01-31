import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentCategoriesErrMsg } from 'features/warehouse/constants/equipment'
import {
  GetEquipmentCategoriesQueryArgs,
  GetEquipmentCategoriesSuccessResponse,
} from 'features/warehouse/models'
import { useGetEquipmentCategoriesQuery } from 'features/warehouse/services/equipmentApi.service'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentCategoriesResult = CustomUseQueryHookResult<
  GetEquipmentCategoriesQueryArgs,
  GetEquipmentCategoriesSuccessResponse
>

type UseGetEquipmentCategoriesOptions = CustomUseQueryOptions<
  GetEquipmentCategoriesQueryArgs,
  GetEquipmentCategoriesSuccessResponse
>

export const useGetEquipmentCategories = (
  args?: GetEquipmentCategoriesQueryArgs,
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
