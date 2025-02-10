import {
  CreateInfrastructureOrderFormWorkMutationArgs,
  CreateInfrastructureOrderFormWorkSuccessResponse,
} from 'features/infrastructures/api/dto'
import { useCreateInfrastructureOrderFormWorkMutation } from 'features/infrastructures/api/infrastructures.endpoints'
import { createInfrastructureOrderFormWorkErrMsg } from 'features/infrastructures/constants'
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
