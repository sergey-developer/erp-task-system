import { useDeleteTaskWorkGroupMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { returnTaskToFirstLineSupportErrorMessage } from 'features/tasks/api/constants'
import { DeleteTaskWorkGroupRequest, DeleteTaskWorkGroupResponse } from 'features/tasks/api/schemas'
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

type UseDeleteTaskWorkGroupResult = CustomUseMutationResult<
  DeleteTaskWorkGroupRequest,
  DeleteTaskWorkGroupResponse
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
        showErrorNotification(returnTaskToFirstLineSupportErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
