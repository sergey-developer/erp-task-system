import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getEquipmentRelocationHistoryMessages } from 'features/warehouse/constants/equipment'
import {
  GetEquipmentRelocationHistorySuccessResponse,
  GetEquipmentRelocationHistoryQueryArgs,
} from 'features/warehouse/models'
import { useGetEquipmentRelocationHistoryQuery } from 'features/warehouse/services/equipmentApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentRelocationHistoryResult = CustomUseQueryHookResult<
  GetEquipmentRelocationHistoryQueryArgs,
  GetEquipmentRelocationHistorySuccessResponse
>

type UseGetEquipmentRelocationHistoryOptions = CustomUseQueryOptions<
  GetEquipmentRelocationHistoryQueryArgs,
  GetEquipmentRelocationHistorySuccessResponse
>

export const useGetEquipmentRelocationHistory = (
  args: GetEquipmentRelocationHistoryQueryArgs,
  options?: UseGetEquipmentRelocationHistoryOptions,
): UseGetEquipmentRelocationHistoryResult => {
  const state = useGetEquipmentRelocationHistoryQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getEquipmentRelocationHistoryMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
