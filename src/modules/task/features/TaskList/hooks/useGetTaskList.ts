import { useEffect } from 'react'

import { taskApiPermissions } from 'modules/task/permissions'
import { useGetTaskListQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetTaskListQueryArgsModel } from '../models'

const useGetTaskList = (filter: GetTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(taskApiPermissions)

  const state = useGetTaskListQuery(filter, {
    skip: !permissions.canGetList,
  })

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return state
}

export default useGetTaskList
