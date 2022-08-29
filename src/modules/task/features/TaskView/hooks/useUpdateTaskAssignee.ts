import { useCallback } from 'react'

import { useUpdateTaskAssigneeMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { UpdateTaskAssigneeMutationArgsModel } from '../models'
import { taskAssigneeApiPermissions } from '../permissions/taskAssignee.permissions'

const useUpdateTaskAssignee = () => {
  const [mutation, state] = useUpdateTaskAssigneeMutation()
  const permissions = useUserPermissions(taskAssigneeApiPermissions)

  const fn = useCallback(
    async (data: UpdateTaskAssigneeMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  return { fn, state }
}

export default useUpdateTaskAssignee
