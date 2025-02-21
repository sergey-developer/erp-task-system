import { useCreateInventorizationMutation } from 'features/inventorizations/api/endpoints/inventorizations.endpoints'
import {
  CreateInventorizationRequest,
  CreateInventorizationResponse,
} from 'features/inventorizations/api/schemas'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { createInventorizationErrorMessage } from '../api/constants'

type UseCreateInventorizationResult = CustomUseMutationResult<
  CreateInventorizationRequest,
  CreateInventorizationResponse
>

export const useCreateInventorization = (): UseCreateInventorizationResult => {
  const [mutation, state] = useCreateInventorizationMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInventorizationErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
