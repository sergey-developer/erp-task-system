import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getWarehousesErrorMessage } from '../api/constants'
import { useGetWarehousesQuery } from '../api/endpoints/warehouses.endpoints'
import { GetWarehousesRequest, GetWarehousesResponse } from '../api/schemas'

type UseGetWarehousesResult = CustomUseQueryHookResult<GetWarehousesRequest, GetWarehousesResponse>

type UseGetWarehousesOptions = CustomUseQueryOptions<GetWarehousesRequest, GetWarehousesResponse>

export const useGetWarehouses = (
  args?: GetWarehousesRequest,
  options?: UseGetWarehousesOptions,
): UseGetWarehousesResult => {
  const state = useGetWarehousesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWarehousesErrorMessage)
    }
  }, [state.error])

  return state
}
