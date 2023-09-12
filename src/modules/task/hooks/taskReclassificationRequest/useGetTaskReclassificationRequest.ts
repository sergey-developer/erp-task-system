import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import {
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
} from 'modules/task/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/permissions'
import { useGetReclassificationRequestQuery } from 'modules/task/services/taskApiService'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/common'
import { isErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTaskReclassificationRequestResult = CustomUseQueryHookResult<
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse
>

type UseGetTaskReclassificationRequestOptions = CustomUseQueryOptions<
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse
>

export const useGetTaskReclassificationRequest = (
  args: GetTaskReclassificationRequestQueryArgs,
  options?: UseGetTaskReclassificationRequestOptions,
): UseGetTaskReclassificationRequestResult => {
  const permissions = useUserPermissions(taskReclassificationRequestApiPermissions)

  const state = useGetReclassificationRequestQuery(args, {
    skip: !permissions.canGet || options?.skip,
  })

  useEffect(() => {
    if (!state.error) return

    if (isErrorResponse(state.error)) {
      if (!isNotFoundError(state.error)) {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error])

  return state
}
