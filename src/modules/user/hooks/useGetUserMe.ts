import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getUserMeMessages } from 'modules/user/constants'
import {
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse,
} from 'modules/user/models'
import { useGetUserMeQuery } from 'modules/user/services/userApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserMeResult = CustomUseQueryHookResult<
  GetUserMeQueryArgs,
  GetUserMeSuccessResponse
>

export const useGetUserMe = (): UseGetUserMeResult => {
  const state = useGetUserMeQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserMeMessages.commonError)
    }
  }, [state.error])

  return state
}
