import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getLocationListMessagesErrorMsg } from 'shared/constants/catalogs'
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
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationListResult = CustomUseLazyQueryHookResult<
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse
>

export const useLazyGetLocationList = (): UseGetLocationListResult => {
  const [trigger, state] = useLazyGetLocationListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationListMessagesErrorMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
