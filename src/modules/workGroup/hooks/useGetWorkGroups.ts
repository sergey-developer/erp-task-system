import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkGroupsErrMsg } from 'modules/workGroup/constants'
import { GetWorkGroupsQueryArgs, GetWorkGroupsSuccessResponse } from 'modules/workGroup/models'
import { useGetWorkGroupsQuery } from 'modules/workGroup/services/workGroupApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
