import { useCallback } from 'react'

import { useUpdateTaskAssigneeMutation } from 'modules/tasks/services/tasks.service'
import useUserRole from 'modules/user/hooks/useUserRole'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { UpdateTaskAssigneeMutationArgsModel } from '../models'

const UPDATE_ASSIGNEE_ERROR_MSG = 'Невозможно изменить исполнителя'

const useUpdateTaskAssignee = () => {
  const [fn, state] = useUpdateTaskAssigneeMutation()

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

  const mutation = useCallback(
    async (data: UpdateTaskAssigneeMutationArgsModel) => {
      if (shouldSkip) return

      try {
        await fn(data).unwrap()
      } catch (error) {
        showErrorNotification(UPDATE_ASSIGNEE_ERROR_MSG)
      }
    },
    [fn, shouldSkip],
  )

  return { mutation, state }
}

export default useUpdateTaskAssignee
