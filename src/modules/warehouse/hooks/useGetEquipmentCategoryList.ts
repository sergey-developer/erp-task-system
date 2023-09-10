import { useEffect } from 'react'

import {
  CustomUseQueryHookResult,
  CustomUseQueryOptions,
} from 'lib/rtk-query/types'

import { getEquipmentCategoryListMessages } from 'modules/warehouse/constants'
import {
  GetEquipmentCategoryListQueryArgs,
  GetEquipmentCategoryListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetEquipmentCategoryListQuery } from 'modules/warehouse/services/equipmentApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetEquipmentCategoryListResult = CustomUseQueryHookResult<
  GetEquipmentCategoryListQueryArgs,
  GetEquipmentCategoryListSuccessResponse
>

export const useGetEquipmentCategoryList = (
  args?: GetEquipmentCategoryListQueryArgs,
  options?: CustomUseQueryOptions<
    GetEquipmentCategoryListQueryArgs,
    GetEquipmentCategoryListSuccessResponse
  >,
): UseGetEquipmentCategoryListResult => {
  const state = useGetEquipmentCategoryListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getEquipmentCategoryListMessages.commonError)
    }
  }, [state.error])

  return state
}
