import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getInventorizationEquipmentsXlsxErrMsg } from 'features/warehouse/constants/inventorization'
import { GetInventorizationEquipmentsXlsxQueryArgs } from 'features/warehouse/models/inventorization'
import { useLazyGetInventorizationEquipmentsXlsxQuery } from 'features/warehouse/services/inventorizationApi.service'
import { GetInventorizationEquipmentsXlsxTransformedSuccessResponse } from 'features/warehouse/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseLazyGetInventorizationEquipmentsResult = CustomUseLazyQueryHookResult<
  GetInventorizationEquipmentsXlsxQueryArgs,
  GetInventorizationEquipmentsXlsxTransformedSuccessResponse
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
