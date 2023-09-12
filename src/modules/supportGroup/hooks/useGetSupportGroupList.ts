import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { getSupportGroupListMessages } from 'modules/supportGroup/constants'
import {
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse,
} from 'modules/supportGroup/models'
import { useGetSupportGroupListQuery } from 'modules/supportGroup/services/supportGroupApiService'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSupportGroupListResult = CustomUseQueryHookResult<
  GetSupportGroupListQueryArgs,
  GetSupportGroupListSuccessResponse
>

export const useGetSupportGroupList = (
  args?: GetSupportGroupListQueryArgs,
): UseGetSupportGroupListResult => {
  const state = useGetSupportGroupListQuery(args)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getSupportGroupListMessages.commonError)
    }
  }, [state.error])

  return state
}
