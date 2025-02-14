import { getUsersGroupsErrMsg } from 'features/users/api/constants'
import { useGetUsersGroupsQuery } from 'features/users/api/endpoints/users.endpoints'
import { GetUsersGroupsRequest, GetUsersGroupsResponse } from 'features/users/api/schemas'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { MaybeUndefined } from 'shared/types/utils'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetUsersGroupsResult = CustomUseQueryHookResult<
  MaybeUndefined<GetUsersGroupsRequest>,
  GetUsersGroupsResponse
>

type UseGetUsersGroupsOptions = CustomUseQueryOptions<
  MaybeUndefined<GetUsersGroupsRequest>,
  GetUsersGroupsResponse
>

export const useGetUsersGroups = (
  args?: GetUsersGroupsRequest,
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
