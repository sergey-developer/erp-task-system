import { useEffect } from 'react'

import { subTaskApiPermissions } from 'modules/task/features/TaskView/permissions'
import { useGetSubTaskListQuery } from 'modules/task/services/subTaskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetSubTaskListQueryArgsModel } from '../models'

export const useGetSubTaskList = (id: GetSubTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const state = useGetSubTaskListQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (!state.isError) return
    showErrorNotification('Не удалось получить задания')
  }, [state.isError])

  return state
}
