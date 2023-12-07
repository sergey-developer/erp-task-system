import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getLocationListErrorMsg } from 'shared/constants/catalogs'
import {
  GetLocationListQueryArgs,
  GetLocationListSuccessResponse,
} from 'shared/models/catalogs/location'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { useGetLocationListQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetLocationListQueryArgs>,
  GetLocationListSuccessResponse
>

type UseGetLocationListOptions = CustomUseQueryOptions<
  MaybeUndefined<GetLocationListQueryArgs>,
  GetLocationListSuccessResponse
>

export const useGetLocationList = (
  args?: GetLocationListQueryArgs,
  options?: UseGetLocationListOptions,
): UseGetLocationListResult => {
  const state = useGetLocationListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else if (isForbiddenError(state.error) && state.error.data.detail) {
        showErrorNotification(state.error.data.detail)
      } else {
        showErrorNotification(getLocationListErrorMsg)
      }
    }
  }, [state.error])

  return state
}
