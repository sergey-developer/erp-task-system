import { GetInventorizationEquipmentsXlsxRequest } from 'features/inventorizations/api/dto'
import { useLazyGetInventorizationEquipmentsXlsxQuery } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
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

import { getInventorizationEquipmentsXlsxErrorMessage } from '../api/constants'

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
          showErrorNotification(getInventorizationEquipmentsXlsxErrorMessage)
        }
      }
    }, [state.error])

    return [trigger, state]
  }
