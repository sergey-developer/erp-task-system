import { useEffect } from 'react'

import { GetTaskQueryArgs } from 'modules/task/models'
import { taskApiPermissions } from 'modules/task/permissions'
import { useGetTaskQuery } from 'modules/task/services/taskApi.service'
import {
  getTaskNotFoundErrorMsg,
  getTaskServerErrorMsg,
} from 'modules/task/utils'
import { useUserPermissions } from 'modules/user/hooks'

import { commonApiMessages } from 'shared/constants/errors'
import {
  isBadRequestError,
  isErrorResponse,
  isNotFoundError,
  isServerRangeError,
} from 'shared/services/api'
import { showErrorNotification } from 'shared/utils/notifications'

export const useGetTask = (id: GetTaskQueryArgs) => {
  const permissions = useUserPermissions(taskApiPermissions)

  const state = useGetTaskQuery(id, {
    skip: !permissions.canGet,
  })

  useEffect(() => {
    if (!state.isError) return

    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getTaskNotFoundErrorMsg(id))
      } else if (
        isBadRequestError(state.error) ||
        isServerRangeError(state.error)
      ) {
        showErrorNotification(getTaskServerErrorMsg(id))
      } else {
        showErrorNotification(commonApiMessages.unknownError)
      }
    }
  }, [id, state.error, state.isError])

  return state
}
