import { completeInventorizationErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CompleteInventorizationRequest,
  CompleteInventorizationResponse,
} from 'features/warehouse/models'
import { useCompleteInventorizationMutation } from 'features/warehouse/services/inventorizationApi.service'
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
