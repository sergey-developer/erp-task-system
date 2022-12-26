import { useCallback, useEffect } from 'react'

import { UpdateTaskAssigneeMutationArgsModel } from 'modules/task/models'
import { taskAssigneeApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskAssigneeMutation } from 'modules/task/services/taskAssigneeApi.service'
import { useUserPermissions } from 'modules/user/hooks'
import { showErrorNotification } from 'shared/utils/notifications'

import { UPDATE_TASK_ASSIGNEE_COMMON_ERROR_MSG } from '../constants/messages'

export const useUpdateTaskAssignee = () => {
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
