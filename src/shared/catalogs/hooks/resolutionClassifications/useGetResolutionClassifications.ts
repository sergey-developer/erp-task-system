import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import {
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse,
} from 'shared/catalogs/api/dto/resolutionClassifications'
import { useGetResolutionClassificationsCatalogQuery } from 'shared/catalogs/api/endpoints/resolutionClassificationsCatalog.endpoints'
import { getResolutionClassificationsCatalogErrMsg } from 'shared/catalogs/constants'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetResolutionClassificationsResult = CustomUseQueryHookResult<
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse
>

type UseGetResolutionClassificationsOptions = CustomUseQueryOptions<
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse
>

export const useGetResolutionClassifications = (
  args: GetResolutionClassificationsQueryArgs,
  options?: UseGetResolutionClassificationsOptions,
): UseGetResolutionClassificationsResult => {
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
