import { getEquipmentsErrMsg } from 'features/equipments/api/constants'
import { useGetEquipmentListQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { GetEquipmentsRequest } from 'features/warehouse/models'
import { GetEquipmentListTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentListResult = CustomUseQueryHookResult<
  GetEquipmentsRequest,
  GetEquipmentListTransformedResponse
>

export const useGetEquipments = (args: GetEquipmentsRequest): UseGetEquipmentListResult => {
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
