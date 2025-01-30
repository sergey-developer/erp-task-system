import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWarehouseErrMsg } from 'features/warehouse/constants/warehouse'
import { GetWarehouseQueryArgs, GetWarehouseSuccessResponse } from 'features/warehouse/models'
import { useGetWarehouseQuery } from 'features/warehouse/services/warehouseApi.service'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
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
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWarehouseErrMsg)
      }
    }
  }, [state.error])

  return state
}
