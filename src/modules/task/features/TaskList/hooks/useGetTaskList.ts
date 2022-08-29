import { useEffect } from 'react'

import { useGetTaskListQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { ErrorResponse, getErrorDetail } from 'shared/services/api'
import showMultipleErrorNotification from 'shared/utils/notifications/showMultipleErrorNotification'

import { GetTaskListQueryArgsModel } from '../models'
import { taskListApiPermissions } from '../permissions/taskList.permissions'

const useGetTaskList = (filter: GetTaskListQueryArgsModel) => {
  const permissions = useUserPermissions(taskListApiPermissions.getList)

  const state = useGetTaskListQuery(filter, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return
    const error = state.error as ErrorResponse
    const errorDetail = getErrorDetail(error)
    showMultipleErrorNotification(errorDetail)
  }, [state.error, state.isError])

  return state
}

export default useGetTaskList
