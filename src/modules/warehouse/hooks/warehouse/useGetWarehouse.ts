import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWarehouseErrorMsg } from 'modules/warehouse/constants/warehouse'
import { GetWarehouseQueryArgs, GetWarehouseSuccessResponse } from 'modules/warehouse/models'
import { useGetWarehouseQuery } from 'modules/warehouse/services/warehouseApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseResult = CustomUseQueryHookResult<
  GetWarehouseQueryArgs,
  GetWarehouseSuccessResponse
>

type UseGetWarehouseOptions = CustomUseQueryOptions<
  GetWarehouseQueryArgs,
  GetWarehouseSuccessResponse
>

export const useGetWarehouse = (
  args: GetWarehouseQueryArgs,
  options?: UseGetWarehouseOptions,
): UseGetWarehouseResult => {
  const state = useGetWarehouseQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWarehouseErrorMsg)
      }
    }
  }, [state.error])

  return state
}
