import { createInfrastructureOrderFormErrorMessage } from 'features/infrastructures/api/constants'
import { useCreateInfrastructureOrderFormMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import {
  CreateInfrastructureOrderFormRequest,
  CreateInfrastructureOrderFormResponse,
} from 'features/infrastructures/api/schemas'
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
  CreateInfrastructureOrderFormRequest,
  CreateInfrastructureOrderFormResponse
>

export const useCreateInfrastructureOrderForm = (): UseCreateInfrastructureOrderFormResult => {
  const [mutation, state] = useCreateInfrastructureOrderFormMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInfrastructureOrderFormErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
