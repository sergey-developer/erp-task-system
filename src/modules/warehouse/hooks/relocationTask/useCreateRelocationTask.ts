import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createRelocationTaskErrorMsg } from 'modules/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskMutationArgs,
  CreateRelocationTaskSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateRelocationTaskMutation } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
        showErrorNotification(createRelocationTaskErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
