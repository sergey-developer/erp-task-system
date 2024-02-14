import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUsersErrMsg } from 'modules/user/constants'
import { GetUsersQueryArgs, GetUsersSuccessResponse } from 'modules/user/models'
import { useGetUsersQuery } from 'modules/user/services/userApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
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
      showErrorNotification(getUsersErrMsg)
    }
  }, [state.error])

  return state
}
