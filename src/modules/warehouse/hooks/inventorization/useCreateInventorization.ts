import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInventorizationErrMsg } from 'modules/warehouse/constants/inventorization'
import {
  CreateInventorizationMutationArgs,
  CreateInventorizationSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateInventorizationMutation } from 'modules/warehouse/services/inventorizationApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
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
