import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getRelocationEquipmentsErrorMessage } from '../api/constants'
import { useGetRelocationEquipmentsQuery } from '../api/endpoints/relocationTasks.endpoints'
import { GetRelocationEquipmentsRequest, GetRelocationEquipmentsResponse } from '../api/schemas'

type UseGetRelocationEquipmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentsRequest,
  GetRelocationEquipmentsResponse
>

type UseGetRelocationEquipmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentsRequest,
  GetRelocationEquipmentsResponse
>

export const useGetRelocationEquipments = (
  args: GetRelocationEquipmentsRequest,
  options?: UseGetRelocationEquipmentListOptions,
): UseGetRelocationEquipmentListResult => {
  const state = useGetRelocationEquipmentsQuery(args, options)

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
