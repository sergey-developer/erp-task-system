import { useUpdateExternalRelocationMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
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

import { updateExternalRelocationErrorMessage } from '../api/constants'
import { UpdateExternalRelocationRequest, UpdateExternalRelocationResponse } from '../api/schemas'

type UseUpdateExternalRelocationResult = CustomUseMutationResult<
  UpdateExternalRelocationRequest,
  UpdateExternalRelocationResponse
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
        showErrorNotification(updateExternalRelocationErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
