import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getLocationsErrMsg } from 'shared/constants/catalogs'
import { GetLocationsQueryArgs, GetLocationsSuccessResponse } from 'shared/models/catalogs/location'
import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { useLazyGetLocationsQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationsResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetLocationsQueryArgs>,
  GetLocationsSuccessResponse
>

export const useLazyGetLocations = (): UseGetLocationsResult => {
  const [trigger, state] = useLazyGetLocationsQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationsErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
