import { useCallback } from 'react'

import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/tasks.service'
import useUserRole from 'modules/user/hooks/useUserRole'

import { UpdateTaskWorkGroupMutationArgsModel } from '../models'

const useUpdateTaskWorkGroup = () => {
  const [mutation, state] = useUpdateTaskWorkGroupMutation()
  const { isFirstLineSupportRole } = useUserRole()

  const shouldSkip = !isFirstLineSupportRole

  const fn = useCallback(
    async (data: UpdateTaskWorkGroupMutationArgsModel) => {
      if (shouldSkip) return

      await mutation(data).unwrap()
    },
    [mutation, shouldSkip],
  )

  return { fn, state }
}

export default useUpdateTaskWorkGroup
