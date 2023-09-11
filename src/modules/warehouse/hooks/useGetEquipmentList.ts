import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentListMessages } from 'modules/warehouse/constants'
import { GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { useGetEquipmentListQuery } from 'modules/warehouse/services/equipmentApi.service'
import { GetEquipmentListTransformedSuccessResponse } from 'modules/warehouse/types'

import { isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentListResult = CustomUseQueryHookResult<
  GetEquipmentListQueryArgs,
  GetEquipmentListTransformedSuccessResponse
>

export const useGetEquipmentList = (
  args: GetEquipmentListQueryArgs,
): UseGetEquipmentListResult => {
  const state = useGetEquipmentListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getEquipmentListMessages.commonError)
      }
    }
  }, [state.error])

  return state
}
