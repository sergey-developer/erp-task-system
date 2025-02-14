import { getEquipmentRelocationHistoryErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentRelocationHistoryQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import {
  GetEquipmentRelocationHistoryRequest,
  GetEquipmentRelocationHistoryResponse,
} from '../api/schemas'

type UseGetEquipmentRelocationHistoryResult = CustomUseQueryHookResult<
  GetEquipmentRelocationHistoryRequest,
  GetEquipmentRelocationHistoryResponse
>

type UseGetEquipmentRelocationHistoryOptions = CustomUseQueryOptions<
  GetEquipmentRelocationHistoryRequest,
  GetEquipmentRelocationHistoryResponse
>

export const useGetEquipmentRelocationHistory = (
  args: GetEquipmentRelocationHistoryRequest,
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
        showErrorNotification(getEquipmentRelocationHistoryErrorMessage)
      }
    }
  }, [state.error])

  return state
}
