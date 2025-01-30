import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskWorkGroupErrMsg } from 'features/task/constants/taskWorkGroup'
import {
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'features/task/models'
import { useUpdateTaskWorkGroupMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateTaskWorkGroupResult = CustomUseMutationResult<
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse
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
        showErrorNotification(updateTaskWorkGroupErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
