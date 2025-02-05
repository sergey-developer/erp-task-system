import { getEquipmentsErrMsg } from 'features/warehouse/constants/equipment'
import { GetEquipmentListQueryArgs } from 'features/warehouse/models'
import { useGetEquipmentListQuery } from 'features/warehouse/services/equipmentApi.service'
import { GetEquipmentListTransformedSuccessResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentListResult = CustomUseQueryHookResult<
  GetEquipmentListQueryArgs,
  GetEquipmentListTransformedSuccessResponse
>

export const useGetEquipments = (args: GetEquipmentListQueryArgs): UseGetEquipmentListResult => {
  const state = useGetEquipmentListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsErrMsg)
      }
    }
  }, [state.error])

  return state
}
