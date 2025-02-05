import { getWarehouseListErrMsg } from 'features/warehouse/constants/warehouse'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'features/warehouse/models'
import { useGetWarehouseListQuery } from 'features/warehouse/services/warehouseApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseListResult = CustomUseQueryHookResult<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

type UseGetWarehouseListOptions = CustomUseQueryOptions<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

export const useGetWarehouses = (
  args?: GetWarehouseListQueryArgs,
  options?: UseGetWarehouseListOptions,
): UseGetWarehouseListResult => {
  const state = useGetWarehouseListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWarehouseListErrMsg)
    }
  }, [state.error])

  return state
}
