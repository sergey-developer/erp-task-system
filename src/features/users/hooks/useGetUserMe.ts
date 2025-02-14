import { getUserMeErrorMessage } from 'features/users/api/constants'
import { useGetUserMeQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUserMeRequest, GetUserMeResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserMeResult = CustomUseQueryHookResult<GetUserMeRequest, GetUserMeResponse>
type UseGetUserMeOptions = CustomUseQueryOptions<GetUserMeRequest, GetUserMeResponse>

export const useGetUserMe = (options?: UseGetUserMeOptions): UseGetUserMeResult => {
  const state = useGetUserMeQuery(undefined, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserMeErrorMessage)
    }
  }, [state.error])

  return state
}
