import { useCallback, useEffect } from 'react'

import { GetTaskListQueryArgs } from 'modules/task/models'
import { taskApiPermissions } from 'modules/task/permissions'
import { useLazyGetTaskListQuery } from 'modules/task/services/taskApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/errors'
import { showErrorNotification } from 'shared/utils/notifications'

export const useLazyGetTaskList = () => {
  const permissions = useUserPermissions(taskApiPermissions)
  const [trigger, state] = useLazyGetTaskListQuery()

  const fn = useCallback(
    (filter: GetTaskListQueryArgs) => {
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
