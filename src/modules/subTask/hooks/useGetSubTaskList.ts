import { useEffect } from 'react'

import { GetSubTaskListQueryArgsModel } from 'modules/subTask/models'
import { useUserPermissions } from 'modules/user/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { subTaskApiPermissions } from '../permissions'
import { useGetSubTaskListQuery } from '../services/subTaskApi.service'

export const useGetSubTaskList = (id: GetSubTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(subTaskApiPermissions)
  const state = useGetSubTaskListQuery(id, { skip: !permissions.canGetList })

  useEffect(() => {
    if (!state.isError) return
    showErrorNotification('Не удалось получить задания')
  }, [state.isError])

  return state
}
