import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createRelocationTaskITSMErrMsg } from 'features/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskITSMMutationArgs,
  CreateRelocationTaskITSMSuccessResponse,
} from 'features/warehouse/models'
import { useCreateRelocationTaskITSMMutation } from 'features/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseCreateRelocationTaskITSMResult = CustomUseMutationResult<
  CreateRelocationTaskITSMMutationArgs,
  CreateRelocationTaskITSMSuccessResponse
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
        showErrorNotification(createRelocationTaskITSMErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
