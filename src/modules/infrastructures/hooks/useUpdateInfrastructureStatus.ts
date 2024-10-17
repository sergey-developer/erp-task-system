import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateInfrastructureStatusErrMsg } from 'modules/infrastructures/constants'
import {
  UpdateInfrastructureStatusMutationArgs,
  UpdateInfrastructureStatusSuccessResponse,
} from 'modules/infrastructures/models'
import { useUpdateInfrastructureStatusMutation } from 'modules/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateInfrastructureStatusResult = CustomUseMutationResult<
  UpdateInfrastructureStatusMutationArgs,
  UpdateInfrastructureStatusSuccessResponse
>

export const useUpdateInfrastructureStatus = (): UseUpdateInfrastructureStatusResult => {
  const [mutation, state] = useUpdateInfrastructureStatusMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error) || isForbiddenError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInfrastructureStatusErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
