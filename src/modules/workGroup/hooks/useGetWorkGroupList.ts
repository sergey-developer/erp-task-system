import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { useUserPermissions } from 'modules/user/hooks'
import { getWorkGroupListMessages } from 'modules/workGroup/constants'
import {
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse,
} from 'modules/workGroup/models'
import { workGroupApiPermissions } from 'modules/workGroup/permissions'
import { useGetWorkGroupListQuery } from 'modules/workGroup/services/workGroupApi.service'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetWorkGroupListResult = CustomUseQueryHookResult<
  GetWorkGroupListQueryArgs,
  GetWorkGroupListSuccessResponse
>

export const useGetWorkGroupList = (
  args?: GetWorkGroupListQueryArgs,
): UseGetWorkGroupListResult => {
  const permissions = useUserPermissions(workGroupApiPermissions)

  const state = useGetWorkGroupListQuery(args, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(getWorkGroupListMessages.commonError)
    }
  }, [state.error])

  return state
}
