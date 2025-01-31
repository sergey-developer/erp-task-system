import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateInfrastructureOrderFormWorkErrMsg } from 'features/infrastructures/constants'
import {
  UpdateInfrastructureOrderFormWorkMutationArgs,
  UpdateInfrastructureOrderFormWorkSuccessResponse,
} from 'features/infrastructures/models'
import { useUpdateInfrastructureOrderFormWorkMutation } from 'features/infrastructures/services/infrastructuresApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateInfrastructureOrderFormWork = CustomUseMutationResult<
  UpdateInfrastructureOrderFormWorkMutationArgs,
  UpdateInfrastructureOrderFormWorkSuccessResponse
>

export const useUpdateInfrastructureOrderFormWork = (): UseUpdateInfrastructureOrderFormWork => {
  const [mutation, state] = useUpdateInfrastructureOrderFormWorkMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateInfrastructureOrderFormWorkErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
