import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getLocationsCatalogErrMsg } from 'shared/constants/catalogs'
import {
  GetLocationsCatalogQueryArgs,
  GetLocationsCatalogSuccessResponse,
} from 'shared/models/catalogs/locations'
import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { useLazyGetLocationsCatalogQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationsCatalogResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetLocationsCatalogQueryArgs>,
  GetLocationsCatalogSuccessResponse
>

export const useLazyGetLocationsCatalog = (): UseGetLocationsCatalogResult => {
  const [trigger, state] = useLazyGetLocationsCatalogQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationsCatalogErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
