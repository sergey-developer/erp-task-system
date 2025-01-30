import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { cancelReclassificationRequestErrMsg } from '../constants'
import {
  CancelReclassificationRequestMutationArgs,
  CancelReclassificationRequestSuccessResponse,
} from '../models'
import { useCancelReclassificationRequestMutation } from '../services/reclassificationRequestApi.service'

type UseCancelReclassificationRequestResult = CustomUseMutationResult<
  CancelReclassificationRequestMutationArgs,
  CancelReclassificationRequestSuccessResponse
>

export const useCancelReclassificationRequest = (): UseCancelReclassificationRequestResult => {
  const [mutation, state] = useCancelReclassificationRequestMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isNotFoundError(state.error) ||
        isForbiddenError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(cancelReclassificationRequestErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
