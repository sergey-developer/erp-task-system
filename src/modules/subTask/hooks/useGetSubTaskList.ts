import { useEffect } from 'react'

import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetSubTaskListQueryArgsModel } from '../models'
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
