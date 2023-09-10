import { useCallback, useEffect } from 'react'

import { updateTaskAssigneeMessages } from 'modules/task/constants'
import { UpdateTaskAssigneeMutationArgs } from 'modules/task/models'
import { taskAssigneeApiPermissions } from 'modules/task/permissions'
import { useUpdateTaskAssigneeMutation } from 'modules/task/services/taskAssigneeApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

export const useUpdateTaskAssignee = () => {
  const permissions = useUserPermissions(taskAssigneeApiPermissions)
  const [mutation, state] = useUpdateTaskAssigneeMutation()

  const fn = useCallback(
    async (data: UpdateTaskAssigneeMutationArgs) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      showErrorNotification(updateTaskAssigneeMessages.commonError)
    }
  }, [state.error])

  return { fn, state }
}
