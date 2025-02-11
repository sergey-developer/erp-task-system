import { getUserMeErrMsg } from 'features/users/api/constants'
import { useGetUserMeQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeQueryArgs, GetUserMeSuccessResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

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
