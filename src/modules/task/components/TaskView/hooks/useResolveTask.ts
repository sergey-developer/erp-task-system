import { useCallback } from 'react'

import { useResolveTaskMutation } from 'modules/task/services/taskApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'

import { ResolveTaskMutationArgsModel } from '../models'
import { taskApiPermissions } from '../permissions/task.permissions'

const useResolveTask = () => {
  const [mutation, state] = useResolveTaskMutation()
  const permissions = useUserPermissions(taskApiPermissions.updateResolution)

  const fn = useCallback(
    async (data: ResolveTaskMutationArgsModel) => {
      if (!permissions.canUpdate) return

      await mutation(data).unwrap()
    },
    [mutation, permissions.canUpdate],
  )

  return { fn, state }
}

export default useResolveTask
