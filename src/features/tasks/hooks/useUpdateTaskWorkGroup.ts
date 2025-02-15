import { updateTaskWorkGroupErrorMessage } from 'features/tasks/api/constants'
import { useUpdateTaskWorkGroupMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { UpdateTaskWorkGroupRequest, UpdateTaskWorkGroupResponse } from 'features/tasks/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateTaskWorkGroupResult = CustomUseMutationResult<
  UpdateTaskWorkGroupRequest,
  UpdateTaskWorkGroupResponse
>

export const useUpdateTaskWorkGroup = (): UseUpdateTaskWorkGroupResult => {
  const [mutation, state] = useUpdateTaskWorkGroupMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateTaskWorkGroupErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
