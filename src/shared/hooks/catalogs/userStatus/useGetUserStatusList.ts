import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getUserStatusListMessages } from 'shared/constants/catalogs'
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

export const useGetUserStatusList = (): UseGetUserStatusListResult => {
  const state = useGetUserStatusListQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserStatusListMessages.commonError)
    }
  }, [state.error])

  return state
}
