import { useEffect } from 'react'

import { GetTaskReclassificationRequestQueryArgs } from 'modules/task/models'
import { taskReclassificationRequestApiPermissions } from 'modules/task/permissions'
import { useGetReclassificationRequestQuery } from 'modules/task/services/taskReclassificationRequestApi.service'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import { isErrorResponse, isNotFoundError } from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTaskReclassificationRequest = (
  taskId: GetTaskReclassificationRequestQueryArgs,
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

    if (isErrorResponse(state.error)) {
      if (!isNotFoundError(state.error)) {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [state.error, state.isError])

  return state
}
