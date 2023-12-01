import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWarehouseMyErrorMsg } from 'modules/warehouse/constants/warehouse'
import { GetWarehouseMyQueryArgs, GetWarehouseMySuccessResponse } from 'modules/warehouse/models'
import { useGetWarehouseMyQuery } from 'modules/warehouse/services/warehouseApi.service'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWarehouseMyResult = CustomUseQueryHookResult<
  GetWarehouseMyQueryArgs,
  GetWarehouseMySuccessResponse
>

type UseGetWarehouseMyOptions = CustomUseQueryOptions<
  GetWarehouseMyQueryArgs,
  GetWarehouseMySuccessResponse
>

export const useGetWarehouseMy = (
  args: GetWarehouseMyQueryArgs,
  options?: UseGetWarehouseMyOptions,
): UseGetWarehouseMyResult => {
  const state = useGetWarehouseMyQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWarehouseMyErrorMsg)
      }
    }
  }, [state.error])

  return state
}
