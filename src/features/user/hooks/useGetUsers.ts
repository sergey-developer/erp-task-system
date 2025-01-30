import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUsersErrMsg } from 'features/user/constants'
import { GetUsersQueryArgs, GetUsersSuccessResponse } from 'features/user/models'
import { useGetUsersQuery } from 'features/user/services/userApi.service'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUsersQueryArgs>,
  GetUsersSuccessResponse
>

type UseGetUsersOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUsersQueryArgs>,
  GetUsersSuccessResponse
>

export const useGetUsers = (
  args?: GetUsersQueryArgs,
  options?: UseGetUsersOptions,
): UseGetUsersResult => {
  const state = useGetUsersQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getUsersErrMsg)
      }
    }
  }, [state.error])

  return state
}
