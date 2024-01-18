import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getEquipmentsXlsxErrorMsg } from 'modules/warehouse/constants/equipment'
import {
  GetEquipmentsXlsxQueryArgs,
  GetEquipmentsXlsxSuccessResponse,
} from 'modules/warehouse/models'
import { useLazyGetEquipmentsXlsxQuery } from 'modules/warehouse/services/equipmentApi.service'

import { getErrorDetail, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetEquipmentsXlsxResult = CustomUseLazyQueryHookResult<
  GetEquipmentsXlsxQueryArgs,
  GetEquipmentsXlsxSuccessResponse
>

export const useLazyGetEquipmentsXlsx = (): UseGetEquipmentsXlsxResult => {
  const [trigger, state] = useLazyGetEquipmentsXlsxQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getEquipmentsXlsxErrorMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
