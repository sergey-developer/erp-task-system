import {
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse,
} from 'features/infrastructures/api/dto'
import { useCreateInfrastructureOrderFormMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { createInfrastructureOrderFormErrMsg } from 'features/infrastructures/constants'
import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInfrastructureOrderFormResult = CustomUseMutationResult<
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse
>

export const useCreateInfrastructureOrderForm = (): UseCreateInfrastructureOrderFormResult => {
  const [mutation, state] = useCreateInfrastructureOrderFormMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInfrastructureOrderFormErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
