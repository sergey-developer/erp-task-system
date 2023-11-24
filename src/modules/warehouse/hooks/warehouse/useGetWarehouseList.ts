import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWarehouseListErrorMsg } from 'modules/warehouse/constants/warehouse'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetWarehouseListQuery } from 'modules/warehouse/services/warehouseApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseListResult = CustomUseQueryHookResult<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

type UseGetWarehouseListOptions = CustomUseQueryOptions<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

export const useGetWarehouseList = (
  args?: GetWarehouseListQueryArgs,
  options?: UseGetWarehouseListOptions,
): UseGetWarehouseListResult => {
  const state = useGetWarehouseListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWarehouseListErrorMsg)
    }
  }, [state.error])

  return state
}
