import { moveRelocationTaskDraftToWorkErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  MoveRelocationTaskDraftToWorkRequest,
  MoveRelocationTaskDraftToWorkResponse,
} from 'features/warehouse/models'
import { useMoveRelocationTaskDraftToWorkMutation } from 'features/warehouse/services/relocationTaskApi.service'
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

type UseMoveRelocationTaskDraftToWorkResult = CustomUseMutationResult<
  MoveRelocationTaskDraftToWorkRequest,
  MoveRelocationTaskDraftToWorkResponse
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
