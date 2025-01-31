import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getSupportGroupListMessages } from 'features/supportGroup/constants'
import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from 'features/supportGroup/models'
import { useGetSupportGroupListQuery } from 'features/supportGroup/services/supportGroupApi.service'

import { isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSupportGroupListResult = CustomUseQueryHookResult<
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse
>

type UseGetSupportGroupListOptions = CustomUseQueryOptions<
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse
>

export const useGetSupportGroupList = (
  args?: GetSupportGroupListQueryArgs,
  options?: UseGetSupportGroupListOptions,
): UseGetSupportGroupListResult => {
  const state = useGetSupportGroupListQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSupportGroupListMessages.commonError)
    }
  }, [state.error])

  return state
}
