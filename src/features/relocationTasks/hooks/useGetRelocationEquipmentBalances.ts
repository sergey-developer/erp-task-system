import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getRelocationEquipmentBalancesErrorMessage } from '../api/constants'
import { useGetRelocationEquipmentBalancesQuery } from '../api/endpoints/relocationTasks.endpoints'
import {
  GetRelocationEquipmentBalancesRequest,
  GetRelocationEquipmentBalancesResponse,
} from '../api/schemas'

type UseGetRelocationEquipmentBalanceListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentBalancesRequest,
  GetRelocationEquipmentBalancesResponse
>

type UseGetRelocationEquipmentBalanceListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentBalancesRequest,
  GetRelocationEquipmentBalancesResponse
>

export const useGetRelocationEquipmentBalances = (
  args: GetRelocationEquipmentBalancesRequest,
  options?: UseGetRelocationEquipmentBalanceListOptions,
): UseGetRelocationEquipmentBalanceListResult => {
  const state = useGetRelocationEquipmentBalancesQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getRelocationEquipmentBalancesErrorMessage)
      }
    }
  }, [state.error])

  return state
}
