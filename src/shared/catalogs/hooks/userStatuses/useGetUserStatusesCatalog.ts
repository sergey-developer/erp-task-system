import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getUserStatusesCatalogErrMsg } from 'shared/catalogs/api/constants/errorMessages'
import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from 'shared/catalogs/api/dto/userStatuses'
import { useGetUserStatusesCatalogQuery } from 'shared/catalogs/api/endpoints/userStatusesCatalog.endpoints'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserStatusesCatalogResult = CustomUseQueryHookResult<
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse
>

type UseGetUserStatusesCatalogOptions = CustomUseQueryOptions<
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse
>

export const useGetUserStatusesCatalog = (
  options?: UseGetUserStatusesCatalogOptions,
): UseGetUserStatusesCatalogResult => {
  const state = useGetUserStatusesCatalogQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserStatusesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
