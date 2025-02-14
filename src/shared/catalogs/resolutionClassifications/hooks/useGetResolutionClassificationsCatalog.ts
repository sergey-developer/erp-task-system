import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getResolutionClassificationsCatalogErrMsg } from '../api/constants'
import { useGetResolutionClassificationsCatalogQuery } from '../api/endpoints/resolutionClassificationsCatalog.endpoints'
import {
  GetResolutionClassificationsCatalogRequest,
  GetResolutionClassificationsCatalogResponse,
} from '../api/schemas'

type UseGetResolutionClassificationsCatalogResult = CustomUseQueryHookResult<
  GetResolutionClassificationsCatalogRequest,
  GetResolutionClassificationsCatalogResponse
>

type UseGetResolutionClassificationsCatalogOptions = CustomUseQueryOptions<
  GetResolutionClassificationsCatalogRequest,
  GetResolutionClassificationsCatalogResponse
>

export const useGetResolutionClassificationsCatalog = (
  args: GetResolutionClassificationsCatalogRequest,
  options?: UseGetResolutionClassificationsCatalogOptions,
): UseGetResolutionClassificationsCatalogResult => {
  const state = useGetResolutionClassificationsCatalogQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getResolutionClassificationsCatalogErrMsg)
      }
    }
  }, [state.error])

  return state
}
