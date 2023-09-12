import { useEffect } from 'react'

import { CustomUseQueryHookResult } from 'lib/rtk-query/types'

import { GetSubTaskListQueryArgs, GetSubTaskListSuccessResponse } from 'modules/task/models'
import { subTaskApiPermissions } from 'modules/task/permissions'
import { useGetSubTaskListQuery } from 'modules/task/services/subTaskApiService'
import { useUserPermissions } from 'modules/user/hooks'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetSubTaskListResult = CustomUseQueryHookResult<
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse
>

export const useGetSubTaskList = (id: GetSubTaskListQueryArgs): UseGetSubTaskListResult => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const state = useGetSubTaskListQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification('Не удалось получить задания')
    }
  }, [state.error])

  return state
}
