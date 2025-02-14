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
import { GetWorkGroupsRequest, GetWorkGroupsResponse } from 'shared/workGroups/api/schemas'

type UseGetWorkGroupsResult = CustomUseQueryHookResult<GetWorkGroupsRequest, GetWorkGroupsResponse>

type UseGetWorkGroupsOptions = CustomUseQueryOptions<GetWorkGroupsRequest, GetWorkGroupsResponse>

export const useGetWorkGroups = (
  args?: GetWorkGroupsRequest,
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
