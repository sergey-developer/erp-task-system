import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentBalanceListMessages } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationEquipmentBalanceListQueryArgs,
  GetRelocationEquipmentBalanceListSuccessResponse,
} from 'features/warehouse/models'
import { useGetRelocationEquipmentBalanceListQuery } from 'features/warehouse/services/relocationTaskApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentBalanceListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentBalanceListQueryArgs,
  GetRelocationEquipmentBalanceListSuccessResponse
>

type UseGetRelocationEquipmentBalanceListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentBalanceListQueryArgs,
  GetRelocationEquipmentBalanceListSuccessResponse
>

export const useGetRelocationEquipmentBalanceList = (
  args: GetRelocationEquipmentBalanceListQueryArgs,
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
