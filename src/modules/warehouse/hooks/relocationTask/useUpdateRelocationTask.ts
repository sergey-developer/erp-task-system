import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateRelocationTaskErrorMsg } from 'modules/warehouse/constants/relocationTask'
import {
  UpdateRelocationTaskMutationArgs,
  UpdateRelocationTaskSuccessResponse,
} from 'modules/warehouse/models'
import { useUpdateRelocationTaskMutation } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateRelocationTaskResult = CustomUseMutationResult<
  UpdateRelocationTaskMutationArgs,
  UpdateRelocationTaskSuccessResponse
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
        showErrorNotification(updateRelocationTaskErrorMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
