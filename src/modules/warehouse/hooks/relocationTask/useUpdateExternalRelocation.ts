import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { updateExternalRelocationErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  UpdateExternalRelocationMutationArgs,
  UpdateExternalRelocationSuccessResponse,
} from 'modules/warehouse/models'
import { useUpdateExternalRelocationMutation } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseUpdateExternalRelocationResult = CustomUseMutationResult<
  UpdateExternalRelocationMutationArgs,
  UpdateExternalRelocationSuccessResponse
>

export const useUpdateExternalRelocation = (): UseUpdateExternalRelocationResult => {
  const [mutation, state] = useUpdateExternalRelocationMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(updateExternalRelocationErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
