import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getLocationListErrorMsg } from 'shared/constants/catalogs'
import {
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse,
} from 'shared/models/catalogs/location'
import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { useLazyGetLocationListQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationListResult = CustomUseLazyQueryHookResult<
  MaybeUndefined<GetLocationListQueryArgs>,
  GetLocationListSuccessResponse
>

export const useLazyGetLocationList = (): UseGetLocationListResult => {
  const [trigger, state] = useLazyGetLocationListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationListErrorMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
