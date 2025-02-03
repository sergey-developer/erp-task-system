import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'
import { getWorkGroupsErrMsg } from 'shared/workGroups/api/constants'
import { useGetWorkGroupsQuery } from 'shared/workGroups/api/endpoints/workGroups.endpoints'
import { GetWorkGroupsQueryArgs, GetWorkGroupsSuccessResponse } from 'shared/workGroups/api/schemas'

type UseGetWorkGroupsResult = CustomUseQueryHookResult<
  GetWorkGroupsQueryArgs,
  GetWorkGroupsSuccessResponse
>

type UseGetWorkGroupsOptions = CustomUseQueryOptions<
  GetWorkGroupsQueryArgs,
  GetWorkGroupsSuccessResponse
>

export const useGetWorkGroups = (
  args?: GetWorkGroupsQueryArgs,
  options?: UseGetWorkGroupsOptions,
): UseGetWorkGroupsResult => {
  const state = useGetWorkGroupsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getWorkGroupsErrMsg)
      }
    }
  }, [state.error])

  return state
}
