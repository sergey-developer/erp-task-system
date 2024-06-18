import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { returnTaskToFirstLineSupportErrMsg } from 'modules/task/constants/task'
import {
  DeleteTaskWorkGroupMutationArgs,
  DeleteTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import { useDeleteTaskWorkGroupMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseDeleteTaskWorkGroupResult = CustomUseMutationResult<
  DeleteTaskWorkGroupMutationArgs,
  DeleteTaskWorkGroupSuccessResponse
>

export const useDeleteTaskWorkGroup = (): UseDeleteTaskWorkGroupResult => {
  const [mutation, state] = useDeleteTaskWorkGroupMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(returnTaskToFirstLineSupportErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
