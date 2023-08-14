import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getUserStatusListMessages } from 'modules/user/constants'
import {
  GetUserStatusListQueryArgs,
  GetUserStatusListSuccessResponse,
} from 'modules/user/models'
import { useGetUserStatusListQuery } from 'modules/user/services/userApi.service'

import { isErrorResponse } from 'shared/services/api'
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
