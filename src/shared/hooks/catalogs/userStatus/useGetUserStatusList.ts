import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUserStatusesErrMsg } from 'shared/constants/catalogs'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'shared/models/catalogs/userStatus'
import { isErrorResponse } from 'shared/services/baseApi'
import { useGetUserStatusListQuery } from 'shared/services/catalogsApi.service'
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
  const state = useGetUserStatusListQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserStatusesErrMsg)
    }
  }, [state.error])

  return state
}
