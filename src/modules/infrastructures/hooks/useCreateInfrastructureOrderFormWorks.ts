import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createInfrastructureOrderFormWorksErrMsg } from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormWorksMutationArgs,
  CreateInfrastructureOrderFormWorksSuccessResponse,
} from 'modules/infrastructures/models'
import { useCreateInfrastructureOrderFormWorksMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateInfrastructureOrderFormWorks = CustomUseMutationResult<
  CreateInfrastructureOrderFormWorksMutationArgs,
  CreateInfrastructureOrderFormWorksSuccessResponse
>

export const useCreateInfrastructureOrderFormWorks = (): UseCreateInfrastructureOrderFormWorks => {
  const [mutation, state] = useCreateInfrastructureOrderFormWorksMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createInfrastructureOrderFormWorksErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
