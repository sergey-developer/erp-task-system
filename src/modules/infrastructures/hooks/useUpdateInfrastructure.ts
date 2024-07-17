import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateInfrastructureErrMsg } from 'modules/infrastructures/constants'
import {
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureSuccessResponse,
} from 'modules/infrastructures/models'
import { useUpdateInfrastructureMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
