import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getLocationsErrMsg } from 'shared/constants/catalogs'
import { GetLocationsQueryArgs, GetLocationsSuccessResponse } from 'shared/models/catalogs/location'
import {
  getErrorDetail,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { useGetLocationsQuery } from 'shared/services/catalogsApi.service'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetLocationsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetLocationsQueryArgs>,
  GetLocationsSuccessResponse
>

type UseGetLocationsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetLocationsQueryArgs>,
  GetLocationsSuccessResponse
>

export const useGetLocations = (
  args?: GetLocationsQueryArgs,
  options?: UseGetLocationsOptions,
): UseGetLocationsResult => {
  const state = useGetLocationsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isForbiddenError(state.error) || isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationsErrMsg)
      }
    }
  }, [state.error])

  return state
}
