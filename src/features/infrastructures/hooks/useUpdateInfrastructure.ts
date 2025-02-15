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

import { updateInfrastructureErrorMessage } from '../api/constants'
import { useUpdateInfrastructureMutation } from '../api/endpoints/infrastructures.endpoints'
import { UpdateInfrastructureRequest, UpdateInfrastructureResponse } from '../api/schemas'

type UseUpdateInfrastructureResult = CustomUseMutationResult<
  UpdateInfrastructureRequest,
  UpdateInfrastructureResponse
>

export const useUpdateInfrastructure = (): UseUpdateInfrastructureResult => {
  const [mutation, state] = useUpdateInfrastructureMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInfrastructureErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
