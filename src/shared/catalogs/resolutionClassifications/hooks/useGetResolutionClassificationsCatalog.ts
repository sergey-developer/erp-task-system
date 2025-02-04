import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { getResolutionClassificationsCatalogErrMsg } from 'shared/catalogs/api/constants/messages'
import {
  GetResolutionClassificationsCatalogQueryArgs,
  GetResolutionClassificationsCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/resolutionClassifications'
import { useGetResolutionClassificationsCatalogQuery } from 'shared/catalogs/resolutionClassifications/api/endpoints/resolutionClassificationsCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetResolutionClassificationsCatalogResult = CustomUseQueryHookResult<
  GetResolutionClassificationsCatalogQueryArgs,
  GetResolutionClassificationsCatalogSuccessResponse
>

type UseGetResolutionClassificationsCatalogOptions = CustomUseQueryOptions<
  GetResolutionClassificationsCatalogQueryArgs,
  GetResolutionClassificationsCatalogSuccessResponse
>

export const useGetResolutionClassificationsCatalog = (
  args: GetResolutionClassificationsCatalogQueryArgs,
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
