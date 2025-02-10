import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { isErrorResponse } from 'shared/api/baseApi'
import { getSupportGroupsErrMsg } from 'shared/supportGroups/api/constants'
import { useGetSupportGroupListQuery } from 'shared/supportGroups/api/endpoints/supportGroups.endpoints'
import {
  GetSupportGroupsQueryArgs,
  GetSupportGroupsSuccessResponse,
} from 'shared/supportGroups/api/schemas'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSupportGroupListResult = CustomUseQueryHookResult<
  GetSupportGroupsQueryArgs,
  GetSupportGroupsSuccessResponse
>

type UseGetSupportGroupListOptions = CustomUseQueryOptions<
  GetSupportGroupsQueryArgs,
  GetSupportGroupsSuccessResponse
>

export const useGetSupportGroups = (
  args?: GetSupportGroupsQueryArgs,
  options?: UseGetSupportGroupListOptions,
): UseGetSupportGroupListResult => {
  const state = useGetSupportGroupListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSupportGroupsErrMsg)
    }
  }, [state.error])

  return state
}
