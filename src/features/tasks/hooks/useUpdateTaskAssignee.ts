import { updateTaskAssigneeErrorMessage } from 'features/tasks/api/constants'
import { useUpdateTaskAssigneeMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { UpdateTaskAssigneeRequest, UpdateTaskAssigneeResponse } from 'features/tasks/api/schemas'
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

type UseUpdateTaskAssigneeResult = CustomUseMutationResult<
  UpdateTaskAssigneeRequest,
  UpdateTaskAssigneeResponse
>

export const useUpdateTaskAssignee = (): UseUpdateTaskAssigneeResult => {
  const [mutation, state] = useUpdateTaskAssigneeMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateTaskAssigneeErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
