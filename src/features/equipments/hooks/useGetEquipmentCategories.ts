import { getEquipmentCategoriesErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentCategoriesQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentCategoriesRequest, GetEquipmentCategoriesResponse } from '../api/schemas'

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
      showErrorNotification(getEquipmentCategoriesErrorMessage)
    }
  }, [state.error])

  return state
}
