import { getWarehouseListErrorMessage } from 'features/warehouse/constants/warehouse'
import {
  GetWarehouseListRequest,
  GetWarehouseListResponse,
} from 'features/warehouse/models'
import { useGetWarehouseListQuery } from 'features/warehouse/services/warehouseApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseListResult = CustomUseQueryHookResult<
  GetWarehouseListRequest,
  GetWarehouseListResponse
>

type UseGetWarehouseListOptions = CustomUseQueryOptions<
  GetWarehouseListRequest,
  GetWarehouseListResponse
>

export const useGetWarehouses = (
  args?: GetWarehouseListRequest,
  options?: UseGetWarehouseListOptions,
): UseGetWarehouseListResult => {
  const state = useGetWarehouseListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWarehouseListErrorMessage)
    }
  }, [state.error])

  return state
}
