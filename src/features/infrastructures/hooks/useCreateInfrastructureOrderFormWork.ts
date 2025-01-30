import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInfrastructureOrderFormWorkErrMsg } from 'features/infrastructures/constants'
import {
  CreateInfrastructureOrderFormWorkMutationArgs,
  CreateInfrastructureOrderFormWorkSuccessResponse,
} from 'features/infrastructures/models'
import { useCreateInfrastructureOrderFormWorkMutation } from 'features/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInfrastructureOrderFormWork = CustomUseMutationResult<
  CreateInfrastructureOrderFormWorkMutationArgs,
  CreateInfrastructureOrderFormWorkSuccessResponse
>

export const useCreateInfrastructureOrderFormWork = (): UseCreateInfrastructureOrderFormWork => {
  const [mutation, state] = useCreateInfrastructureOrderFormWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInfrastructureOrderFormWorkErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
