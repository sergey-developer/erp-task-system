import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { getLocationsCatalogErrorMessage } from 'shared/catalogs/api/constants/messages'
import {
  GetLocationsCatalogRequest,
  GetLocationsCatalogResponse,
} from 'shared/catalogs/api/dto/locations'
import { useLazyGetLocationsCatalogQuery } from 'shared/catalogs/api/endpoints/locationsCatalog.endpoints'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

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
