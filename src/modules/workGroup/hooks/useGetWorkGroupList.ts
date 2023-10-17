import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getWorkGroupListMessages } from 'modules/workGroup/constants'
import {
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse,
} from 'modules/workGroup/models'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkGroupListResult = CustomUseQueryHookResult<
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse
>

type UseGetWorkGroupListOptions = CustomUseQueryOptions<
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse
>

export const useGetWorkGroupList = (
  args?: GetWorkGroupListQueryArgs,
  options?: UseGetWorkGroupListOptions,
): UseGetWorkGroupListResult => {
  const state = useGetWorkGroupListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkGroupListMessages.commonError)
    }
  }, [state.error])

  return state
}
