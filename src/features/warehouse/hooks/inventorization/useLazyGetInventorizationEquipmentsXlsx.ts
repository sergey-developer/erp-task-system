import { getInventorizationEquipmentsXlsxErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsXlsxRequest } from 'features/warehouse/models/inventorization'
import { useLazyGetInventorizationEquipmentsXlsxQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsXlsxTransformedResponse } from 'features/warehouse/types'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetInventorizationEquipmentsResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentsXlsxRequest,
  GetInventorizationEquipmentsXlsxTransformedResponse
>

export const useLazyGetInventorizationEquipmentsXlsx =
  (): UseLazyGetInventorizationEquipmentsResult => {
    const [trigger, state] = useLazyGetInventorizationEquipmentsXlsxQuery()

    useEffect(() => {
      if (isErrorResponse(state.error)) {
        if (
          isBadRequestError(state.error) ||
          isForbiddenError(state.error) ||
          isNotFoundError(state.error)
        ) {
          showErrorNotification(getErrorDetail(state.error))
        } else {
          showErrorNotification(getInventorizationEquipmentsXlsxErrMsg)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
