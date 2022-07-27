import { useCallback } from 'react'

import { useUpdateTaskAssigneeMutation } from 'modules/task/services/taskApi.service'
import useUserRole from 'modules/user/hooks/useUserRole'

import { UpdateTaskAssigneeMutationArgsModel } from '../models'

const useUpdateTaskAssignee = () => {
  const [mutation, state] = useUpdateTaskAssigneeMutation()

  const {
    isFirstLineSupportRole,
    isEngineerRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = useUserRole()

  const shouldSkip = !(
    isFirstLineSupportRole ||
    isEngineerRole ||
    isSeniorEngineerRole ||
    isHeadOfDepartmentRole
  )

  const fn = useCallback(
    async (data: UpdateTaskAssigneeMutationArgsModel) => {
      if (shouldSkip) return

      await mutation(data).unwrap()
    },
    [mutation, shouldSkip],
  )

  return { fn, state }
}

export default useUpdateTaskAssignee
