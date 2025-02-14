import { createInventorizationErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CreateInventorizationRequest,
  CreateInventorizationResponse,
} from 'features/warehouse/models'
import { useCreateInventorizationMutation } from 'features/warehouse/services/inventorizationApi.service'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
        showErrorNotification(createInventorizationErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
