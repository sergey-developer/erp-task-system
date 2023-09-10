import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUserListMessages } from 'modules/user/constants'
import { GetUserListQueryArgs, GetUserListSuccessResponse } from 'modules/user/models'
import { useGetUserListQuery } from 'modules/user/services/userApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUserListResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUserListQueryArgs>,
  GetUserListSuccessResponse
>

type UseGetUserListOptions = CustomUseQueryOptions<GetUserListQueryArgs, GetUserListSuccessResponse>

export const useGetUserList = (
  args?: GetUserListQueryArgs,
  options?: UseGetUserListOptions,
): UseGetUserListResult => {
  const state = useGetUserListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUserListMessages.commonError)
    }
  }, [state.error])

  return state
}
