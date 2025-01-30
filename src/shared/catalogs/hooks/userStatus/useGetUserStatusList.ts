import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/services/baseApi'
import { useGetUserStatusesCatalogQuery } from 'shared/catalogs/api/endpoints/userStatusesCatalog'
import { getUserStatusesCatalogErrMsg } from 'shared/catalogs/constants'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/catalogs/models/userStatuses'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserStatusListResult = CustomUseQueryHookResult<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

type UseGetUserStatusListOptions = CustomUseQueryOptions<
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse
>

export const useGetUserStatusList = (
  options?: UseGetUserStatusListOptions,
): UseGetUserStatusListResult => {
  const state = useGetUserStatusesCatalogQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserStatusesCatalogErrMsg)
    }
  }, [state.error])

  return state
}
