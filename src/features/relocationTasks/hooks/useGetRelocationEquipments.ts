import { useGetRelocationEquipmentListQuery } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { getRelocationEquipmentsErrorMessage } from 'features/relocationTasks/constants'
import {
  GetRelocationEquipmentListRequest,
  GetRelocationEquipmentListResponse,
} from 'features/warehouse/models'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentListRequest,
  GetRelocationEquipmentListResponse
>

type UseGetRelocationEquipmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentListRequest,
  GetRelocationEquipmentListResponse
>

export const useGetRelocationEquipments = (
  args: GetRelocationEquipmentListRequest,
  options?: UseGetRelocationEquipmentListOptions,
): UseGetRelocationEquipmentListResult => {
  const state = useGetRelocationEquipmentListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isNotFoundError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getRelocationEquipmentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
