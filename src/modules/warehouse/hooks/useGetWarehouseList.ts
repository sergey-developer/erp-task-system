import { useEffect } from 'react'

import {
  CustomUseQueryHookResult,
  CustomUseQueryOptions,
} from 'lib/rtk-query/types'

import { getWarehouseListMessages } from 'modules/warehouse/constants'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetWarehouseListQuery } from 'modules/warehouse/services/warehouseApi.service'

import { isErrorResponse } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetWarehouseListResult = CustomUseQueryHookResult<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

export const useGetWarehouseList = (
  args?: GetWarehouseListQueryArgs,
  options?: CustomUseQueryOptions<
    GetWarehouseListQueryArgs,
    GetWarehouseListSuccessResponse
  >,
): UseGetWarehouseListResult => {
  const state = useGetWarehouseListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWarehouseListMessages.commonError)
    }
  }, [state.error])

  return state
}
