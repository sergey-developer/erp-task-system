import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUserMeErrMsg } from 'features/user/constants'
import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'features/user/models'
import { useGetUserMeQuery } from 'features/user/services/userApi.service'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserMeResult = CustomUseQueryHookResult<GetUserMeQueryArgs, GetUserMeSuccessResponse>
type UseGetUserMeOptions = CustomUseQueryOptions<GetUserMeQueryArgs, GetUserMeSuccessResponse>

export const useGetUserMe = (options?: UseGetUserMeOptions): UseGetUserMeResult => {
  const state = useGetUserMeQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserMeErrMsg)
    }
  }, [state.error])

  return state
}
