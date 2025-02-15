import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getLocationsCatalogErrorMessage } from '../api/constants'
import { useLazyGetLocationsCatalogQuery } from '../api/endpoints/locationsCatalog.endpoints'
import { GetLocationsCatalogRequest, GetLocationsCatalogResponse } from '../api/schemas'

type UseGetLocationsCatalogResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetLocationsCatalogRequest>,
  GetLocationsCatalogResponse
>

export const useLazyGetLocationsCatalog = (): UseGetLocationsCatalogResult => {
  const [trigger, state] = useLazyGetLocationsCatalogQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationsCatalogErrorMessage)
      }
    }
  }, [state.error])

  return [trigger, state]
}
