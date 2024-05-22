import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateTaskWorkGroupErrMsg } from 'modules/task/constants/taskWorkGroup'
import {
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import { useUpdateTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
