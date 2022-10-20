import { useEffect } from 'react'

import { useGetReclassificationRequestQuery } from 'modules/task/services/taskReclassificationRequestApi.service'
import useUserPermissions from 'modules/user/hooks/useUserPermissions'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'
import { ErrorResponse, isNotFoundError } from 'shared/services/api'
import showErrorNotification from 'shared/utils/notifications/showErrorNotification'

import { GetTaskReclassificationRequestQueryArgsModel } from '../models'
import { taskReclassificationRequestApiPermissions } from '../permissions'

const useGetTaskReclassificationRequest = (
  taskId: GetTaskReclassificationRequestQueryArgsModel,
  options?: Partial<{ skip: boolean }>,
) => {
  const permissions = useUserPermissions(
    taskReclassificationRequestApiPermissions,
  )

  const state = useGetReclassificationRequestQuery(taskId, {
    skip: !permissions.canGet || options?.skip,
  })

  useEffect(() => {
    if (!state.isError) return

    const error = state.error as ErrorResponse

    if (!isNotFoundError(error)) {
      showErrorNotification(UNKNOWN_ERROR_MSG)
    }
  }, [state.error, state.isError])

  return state
}

export default useGetTaskReclassificationRequest
