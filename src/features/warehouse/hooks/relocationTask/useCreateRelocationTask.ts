import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createRelocationTaskErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskMutationArgs,
  CreateRelocationTaskSuccessResponse,
} from 'features/warehouse/models'
import { useCreateRelocationTaskMutation } from 'features/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateRelocationTaskResult = CustomUseMutationResult<
  CreateRelocationTaskMutationArgs,
  CreateRelocationTaskSuccessResponse
>

export const useCreateRelocationTask = (): UseCreateRelocationTaskResult => {
  const [mutation, state] = useCreateRelocationTaskMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createRelocationTaskErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
