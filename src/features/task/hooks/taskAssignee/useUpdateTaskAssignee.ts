import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskAssigneeErrMsg } from 'features/task/constants/taskAssignee'
import {
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
} from 'features/task/models'
import { useUpdateTaskAssigneeMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateTaskAssigneeResult = CustomUseMutationResult<
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse
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
        showErrorNotification(updateTaskAssigneeErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
