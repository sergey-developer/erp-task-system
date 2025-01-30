import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentsXlsxErrMsg } from 'features/warehouse/constants/equipment'
import {
  GetEquipmentsXlsxQueryArgs,
  GetEquipmentsXlsxSuccessResponse,
} from 'features/warehouse/models'
import { useLazyGetEquipmentsXlsxQuery } from 'features/warehouse/services/equipmentApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetEquipmentsXlsxResult = CustomUseLazyQueryHookResult<
  GetEquipmentsXlsxQueryArgs,
  GetEquipmentsXlsxSuccessResponse
>

export const useLazyGetEquipmentsXlsx = (): UseLazyGetEquipmentsXlsxResult => {
  const [trigger, state] = useLazyGetEquipmentsXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsXlsxErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
