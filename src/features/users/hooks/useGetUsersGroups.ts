import { getUsersGroupsErrMsg } from 'features/users/api/constants'
import { useGetUsersGroupsQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUsersGroupsQueryArgs, GetUsersGroupsSuccessResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
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
