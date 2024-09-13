import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUsersGroupsErrMsg } from 'modules/user/constants'
import { GetUsersGroupsQueryArgs, GetUsersGroupsSuccessResponse } from 'modules/user/models'
import { useGetUsersGroupsQuery } from 'modules/user/services/userApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersGroupsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUsersGroupsQueryArgs>,
  GetUsersGroupsSuccessResponse
>

type UseGetUsersGroupsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUsersGroupsQueryArgs>,
  GetUsersGroupsSuccessResponse
>

export const useGetUsersGroups = (
  args?: GetUsersGroupsQueryArgs,
  options?: UseGetUsersGroupsOptions,
): UseGetUsersGroupsResult => {
  const state = useGetUsersGroupsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getUsersGroupsErrMsg)
    }
  }, [state.error])

  return state
}
