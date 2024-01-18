import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentsErrorMsg } from 'modules/warehouse/constants/equipment'
import { GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { useGetEquipmentListQuery } from 'modules/warehouse/services/equipmentApi.service'
import { GetEquipmentListTransformedSuccessResponse } from 'modules/warehouse/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentListResult = CustomUseQueryHookResult<
  GetEquipmentListQueryArgs,
  GetEquipmentListTransformedSuccessResponse
>

export const useGetEquipmentList = (args: GetEquipmentListQueryArgs): UseGetEquipmentListResult => {
  const state = useGetEquipmentListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsErrorMsg)
      }
    }
  }, [state.error])

  return state
}
