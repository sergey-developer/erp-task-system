import { useEffect } from 'react'

import { GetSubTaskListQueryArgs } from 'modules/subTask/models'
import { subTaskApiPermissions } from 'modules/subTask/permissions'
import { useGetSubTaskListQuery } from 'modules/subTask/services/subTaskApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetSubTaskList = (id: GetSubTaskListQueryArgs) => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const state = useGetSubTaskListQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification('Не удалось получить задания')
    }
  }, [state.error])

  return state
}
