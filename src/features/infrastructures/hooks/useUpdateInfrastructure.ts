import {
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureSuccessResponse,
} from 'features/infrastructures/api/dto'
import { useUpdateInfrastructureMutation } from 'features/infrastructures/api/endpoints/infrastructures.endpoints'
import { updateInfrastructureErrMsg } from 'features/infrastructures/constants'
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

type UseUpdateInfrastructureResult = CustomUseMutationResult<
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureSuccessResponse
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
        showErrorNotification(updateInfrastructureErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
