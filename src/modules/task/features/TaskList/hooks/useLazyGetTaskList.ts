import { useCallback, useEffect } from 'react'

import { taskApiPermissions } from 'modules/task/permissions'
import { useLazyGetTaskListQuery } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetTaskListQueryArgsModel } from '../models'

const useLazyGetTaskList = () => {
  const permissions = useUserPermissions(taskApiPermissions)
  const [trigger, state] = useLazyGetTaskListQuery()

  const fn = useCallback(
    (filter: GetTaskListQueryArgsModel) => {
      if (permissions.canGetList) {
        trigger(filter)
      }
    },
    [permissions.canGetList, trigger],
  )

  useEffect(() => {
    if (!state.isError) return
    showErrorNotification(UNKNOWN_ERROR_MSG)
  }, [state.isError])

  return { fn, state }
}

export default useLazyGetTaskList
