import { useGetRelocationEquipmentBalanceListQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { getRelocationEquipmentBalancesErrorMessage } from 'features/relocationTasks/constants'
import {
  GetRelocationEquipmentBalanceListRequest,
  GetRelocationEquipmentBalanceListResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentBalanceListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentBalanceListRequest,
  GetRelocationEquipmentBalanceListResponse
>

type UseGetRelocationEquipmentBalanceListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentBalanceListRequest,
  GetRelocationEquipmentBalanceListResponse
>

export const useGetRelocationEquipmentBalances = (
  args: GetRelocationEquipmentBalanceListRequest,
  options?: UseGetRelocationEquipmentBalanceListOptions,
): UseGetRelocationEquipmentBalanceListResult => {
  const state = useGetRelocationEquipmentBalanceListQuery(args, options)

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
