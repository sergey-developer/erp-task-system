import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInventorizationErrMsg } from 'features/warehouse/constants/inventorization'
import {
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
} from 'features/warehouse/models'
import { useCreateInventorizationMutation } from 'features/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInventorizationResult = CustomUseMutationResult<
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse
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
