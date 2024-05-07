import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentCategoriesErrMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentCategoriesQueryArgs,
  GetEquipmentCategoriesSuccessResponse,
} from 'modules/warehouse/models'
import { useGetEquipmentCategoriesQuery } from 'modules/warehouse/services/equipmentApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
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
