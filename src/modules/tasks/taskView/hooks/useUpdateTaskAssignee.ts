import { useCallback } from 'react'

import { useUpdateTaskAssigneeMutation } from 'modules/tasks/services/tasks.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { UpdateTaskAssigneeMutationArgsModel } from '../models'

const UPDATE_ASSIGNEE_ERROR_MSG = 'Невозможно изменить исполнителя'

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

      try {
        await mutation(data).unwrap()
      } catch (error) {
        showErrorNotification(UPDATE_ASSIGNEE_ERROR_MSG)
        throw error
      }
    },
    [mutation, shouldSkip],
  )

  return { fn, state }
}

export default useUpdateTaskAssignee
