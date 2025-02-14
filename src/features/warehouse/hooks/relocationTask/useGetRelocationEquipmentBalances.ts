import { getRelocationEquipmentBalanceListMessages } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationEquipmentBalanceListRequest,
  GetRelocationEquipmentBalanceListResponse,
} from 'features/warehouse/models'
import { useGetRelocationEquipmentBalanceListQuery } from 'features/warehouse/services/relocationTaskApi.service'
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
        showErrorNotification(getRelocationEquipmentBalanceListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
