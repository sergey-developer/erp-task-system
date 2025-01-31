import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentListMessages } from 'features/warehouse/constants/relocationTask'
import {
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
} from 'features/warehouse/models'
import { useGetRelocationEquipmentListQuery } from 'features/warehouse/services/relocationTaskApi.service'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse
>

type UseGetRelocationEquipmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse
>

export const useGetRelocationEquipmentList = (
  args: GetRelocationEquipmentListQueryArgs,
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
        showErrorNotification(getRelocationEquipmentListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
