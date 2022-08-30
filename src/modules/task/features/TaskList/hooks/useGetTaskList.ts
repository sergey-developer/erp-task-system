import { useEffect } from 'react'

import { useGetTaskListQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/messages'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { GetTaskListQueryArgsModel } from '../models'
import { taskListApiPermissions } from '../permissions/taskList.permissions'

const useGetTaskList = (filter: GetTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(taskListApiPermissions.getList)

  const state = useGetTaskListQuery(filter, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return state
}

export default useGetTaskList
