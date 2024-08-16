import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getResolutionClassificationsCatalogErrMsg } from 'shared/constants/catalogs'
import {
  GetResolutionClassificationsQueryArgs,
  GetResolutionClassificationsSuccessResponse,
} from 'shared/models/catalogs/resolutionClassifications'
import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { useGetResolutionClassificationsQuery } from 'shared/services/catalogsApi.service'
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
  const state = useGetResolutionClassificationsQuery(args, options)

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
