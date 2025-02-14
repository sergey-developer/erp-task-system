import { getEquipmentsErrorMessage } from 'features/equipments/api/constants'
import { useGetEquipmentsQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetEquipmentsRequest } from '../api/schemas'
import { GetEquipmentsTransformedResponse } from '../api/types'

type UseGetEquipmentListResult = CustomUseQueryHookResult<
  GetEquipmentsRequest,
  GetEquipmentsTransformedResponse
>

export const useGetEquipments = (args: GetEquipmentsRequest): UseGetEquipmentListResult => {
  const state = useGetEquipmentsQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsErrorMessage)
      }
    }
  }, [state.error])

  return state
}
