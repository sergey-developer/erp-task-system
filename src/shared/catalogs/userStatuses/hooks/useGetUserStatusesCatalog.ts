import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getUserStatusesCatalogErrMsg } from '../api/constants'
import { useGetUserStatusesCatalogQuery } from '../api/endpoints/userStatusesCatalog.endpoints'
import {
  GetUserStatusesCatalogQueryArgs,
  GetUserStatusesCatalogSuccessResponse,
} from '../api/schemas'

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
