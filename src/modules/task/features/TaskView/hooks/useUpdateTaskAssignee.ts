import { useCallback, useEffect } from 'react'

import { useUpdateTaskAssigneeMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG } from '../constants/messages'
import { UpdateTaskAssigneeMutationArgsModel } from '../models'
import { taskAssigneeApiPermissions } from '../permissions'

const useUpdateTaskAssignee = () => {
  const permissions = useUserPermissions(taskAssigneeApiPermissions)
  const [mutation, state] = useUpdateTaskAssigneeMutation()

  const fn = useCallback(
    async (data: UpdateTaskAssigneeMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (!state.isError) return

    showErrorNotification(UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG)
  }, [state.isError])

  return { fn, state }
}

export default useUpdateTaskAssignee
