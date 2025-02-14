import { useCompleteInventorizationMutation } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  CompleteInventorizationRequest,
  CompleteInventorizationResponse,
} from 'features/warehouse/models'
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

import { completeInventorizationErrMsg } from '../api/constants'

type UseCompleteInventorizationResult = CustomUseMutationResult<
  CompleteInventorizationRequest,
  CompleteInventorizationResponse
>

export const useCompleteInventorization = (): UseCompleteInventorizationResult => {
  const [mutation, state] = useCompleteInventorizationMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(completeInventorizationErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
