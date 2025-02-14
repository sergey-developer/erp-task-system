import { getUsersErrorMessage } from 'features/users/api/constants'
import { useGetUsersQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUsersRequest, GetUsersResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersResult = CustomUseQueryHookResult<MaybeUndefined<GetUsersRequest>, GetUsersResponse>

type UseGetUsersOptions = CustomUseQueryOptions<MaybeUndefined<GetUsersRequest>, GetUsersResponse>

export const useGetUsers = (
  args?: GetUsersRequest,
  options?: UseGetUsersOptions,
): UseGetUsersResult => {
  const state = useGetUsersQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getUsersErrorMessage)
      }
    }
  }, [state.error])

  return state
}
