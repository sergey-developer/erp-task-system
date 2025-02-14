import { updateRelocationTaskErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  UpdateRelocationTaskRequest,
  UpdateRelocationTaskResponse,
} from 'features/warehouse/models'
import { useUpdateRelocationTaskMutation } from 'features/warehouse/services/relocationTaskApi.service'
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

type UseUpdateRelocationTaskResult = CustomUseMutationResult<
  UpdateRelocationTaskRequest,
  UpdateRelocationTaskResponse
>

export const useUpdateRelocationTask = (): UseUpdateRelocationTaskResult => {
  const [mutation, state] = useUpdateRelocationTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateRelocationTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
