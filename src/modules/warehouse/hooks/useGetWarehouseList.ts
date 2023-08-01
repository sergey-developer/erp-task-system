import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getWarehouseListMessages } from 'modules/warehouse/constants'
import {
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse,
} from 'modules/warehouse/models'
import { useGetWarehouseListQuery } from 'modules/warehouse/services/warehouseApi.service'

import { showErrorNotification } from 'shared/utils/notifications'

export type UseGetWarehouseListResult = CustomUseQueryHookResult<
  GetWarehouseListQueryArgs,
  GetWarehouseListSuccessResponse
>

export const useGetWarehouseList = (
  args?: GetWarehouseListQueryArgs,
): UseGetWarehouseListResult => {
  const state = useGetWarehouseListQuery(args)

  useEffect(() => {
    if (state.isError) {
      showErrorNotification(getWarehouseListMessages.commonError)
    }
  }, [state.isError])

  return state
}
