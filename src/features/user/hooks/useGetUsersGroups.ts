import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getUsersGroupsErrMsg } from 'features/user/constants'
import { GetUsersGroupsQueryArgs, GetUsersGroupsSuccessResponse } from 'features/user/models'
import { useGetUsersGroupsQuery } from 'features/user/services/userApi.service'

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
