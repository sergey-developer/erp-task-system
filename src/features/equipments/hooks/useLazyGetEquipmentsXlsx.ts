import { getEquipmentsXlsxErrorMessage } from 'features/equipments/api/constants'
import { useLazyGetEquipmentsXlsxQuery } from 'features/equipments/api/endpoints/equipments.endpoints'
import {
  GetEquipmentsXlsxRequest,
  GetEquipmentsXlsxResponse,
} from 'features/equipments/api/schemas'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetEquipmentsXlsxResult = CustomUseLazyQueryHookResult<
  GetEquipmentsXlsxRequest,
  GetEquipmentsXlsxResponse
>

export const useLazyGetEquipmentsXlsx = (): UseLazyGetEquipmentsXlsxResult => {
  const [trigger, state] = useLazyGetEquipmentsXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsXlsxErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
