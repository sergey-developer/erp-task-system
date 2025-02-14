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

import { cancelReclassificationRequestErrorMessage } from '../api/constants'
import { useCancelReclassificationRequestMutation } from '../api/endpoints/reclassificationRequests.endpoints'
import {
  CancelReclassificationRequestRequest,
  CancelReclassificationRequestResponse,
} from '../api/schemas'

type UseCancelReclassificationRequestResult = CustomUseMutationResult<
  CancelReclassificationRequestRequest,
  CancelReclassificationRequestResponse
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
        showErrorNotification(cancelReclassificationRequestErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
