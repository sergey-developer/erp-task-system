import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

import { getLocationsCatalogErrMsg } from '../api/constants'
import { useGetLocationsCatalogQuery } from '../api/endpoints/locationsCatalog.endpoints'
import { GetLocationsCatalogRequest, GetLocationsCatalogResponse } from '../api/schemas'

type UseGetLocationsCatalogResult = CustomUseQueryHookResult<
  MaybeUndefined<GetLocationsCatalogRequest>,
  GetLocationsCatalogResponse
>

type UseGetLocationsCatalogOptions = CustomUseQueryOptions<
  MaybeUndefined<GetLocationsCatalogRequest>,
  GetLocationsCatalogResponse
>

export const useGetLocationsCatalog = (
  args?: GetLocationsCatalogRequest,
  options?: UseGetLocationsCatalogOptions,
): UseGetLocationsCatalogResult => {
  const state = useGetLocationsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getLocationsCatalogErrMsg)
      }
    }
  }, [state.error])

  return state
}
