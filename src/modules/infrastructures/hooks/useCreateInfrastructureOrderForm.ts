import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInfrastructureOrderFormErrMsg } from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse,
} from 'modules/infrastructures/models'
import { useCreateInfrastructureOrderFormMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
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
