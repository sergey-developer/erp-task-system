import { useCallback } from 'react'

import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { UpdateTaskWorkGroupMutationArgsModel } from '../models'
import workGroupPermissions from '../permissions/workGroup.permissions'

const useUpdateTaskWorkGroup = () => {
  const [mutation, state] = useUpdateTaskWorkGroupMutation()
  const permissions = useUserPermissions(workGroupPermissions.update)

  const fn = useCallback(
    async (data: UpdateTaskWorkGroupMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  return { fn, state }
}

export default useUpdateTaskWorkGroup
