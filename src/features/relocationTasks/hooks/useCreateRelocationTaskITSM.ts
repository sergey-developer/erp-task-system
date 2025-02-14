import { useCreateRelocationTaskITSMMutation } from 'features/relocationTasks/api/endpoints/relocationTasks.endpoints'
import { createRelocationTaskITSMErrorMessage } from 'features/relocationTasks/constants'
import {
  CreateRelocationTaskITSMRequest,
  CreateRelocationTaskITSMResponse,
} from 'features/warehouse/models'
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

type UseCreateRelocationTaskITSMResult = CustomUseMutationResult<
  CreateRelocationTaskITSMRequest,
  CreateRelocationTaskITSMResponse
>

export const useCreateRelocationTaskITSM = (): UseCreateRelocationTaskITSMResult => {
  const [mutation, state] = useCreateRelocationTaskITSMMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(createRelocationTaskITSMErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
