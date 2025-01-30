import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { moveRelocationTaskDraftToWorkErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  MoveRelocationTaskDraftToWorkMutationArgs,
  MoveRelocationTaskDraftToWorkSuccessResponse,
} from 'features/warehouse/models'
import { useMoveRelocationTaskDraftToWorkMutation } from 'features/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseMoveRelocationTaskDraftToWorkResult = CustomUseMutationResult<
  MoveRelocationTaskDraftToWorkMutationArgs,
  MoveRelocationTaskDraftToWorkSuccessResponse
>

export const useMoveRelocationTaskDraftToWork = (): UseMoveRelocationTaskDraftToWorkResult => {
  const [mutation, state] = useMoveRelocationTaskDraftToWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(moveRelocationTaskDraftToWorkErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
