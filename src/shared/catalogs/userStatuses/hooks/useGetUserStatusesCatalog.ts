import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { getUserStatusesCatalogErrMsg } from '../api/constants'
import { useGetUserStatusesCatalogQuery } from '../api/endpoints/userStatusesCatalog.endpoints'
import { GetUserStatusesCatalogRequest, GetUserStatusesCatalogResponse } from '../api/schemas'

type UseGetUserStatusesCatalogResult = CustomUseQueryHookResult<
  GetUserStatusesCatalogRequest,
  GetUserStatusesCatalogResponse
>

type UseGetUserStatusesCatalogOptions = CustomUseQueryOptions<
  GetUserStatusesCatalogRequest,
  GetUserStatusesCatalogResponse
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
