import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWarehouseErrorMessage } from '../api/constants'
import { useGetWarehouseQuery } from '../api/endpoints/warehouses.endpoints'
import { GetWarehouseRequest, GetWarehouseResponse } from '../api/schemas'

type UseGetWarehouseResult = CustomUseQueryHookResult<GetWarehouseRequest, GetWarehouseResponse>

type UseGetWarehouseOptions = CustomUseQueryOptions<GetWarehouseRequest, GetWarehouseResponse>

export const useGetWarehouse = (
  args: GetWarehouseRequest,
  options?: UseGetWarehouseOptions,
): UseGetWarehouseResult => {
  const state = useGetWarehouseQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWarehouseErrorMessage)
      }
    }
  }, [state.error])

  return state
}
