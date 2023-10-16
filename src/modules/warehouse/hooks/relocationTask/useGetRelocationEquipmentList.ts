import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getRelocationEquipmentListMessages } from 'modules/warehouse/constants/relocationTask'
import { GetRelocationEquipmentListQueryArgs } from 'modules/warehouse/models'
import { useGetRelocationEquipmentListQuery } from 'modules/warehouse/services/relocationTaskApi.service'
import { GetRelocationEquipmentListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetRelocationEquipmentListResult = CustomUseQueryHookResult<
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListTransformedSuccessResponse
>

type UseGetRelocationEquipmentListOptions = CustomUseQueryOptions<
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListTransformedSuccessResponse
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
