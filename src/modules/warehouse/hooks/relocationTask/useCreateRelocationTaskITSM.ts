import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { createRelocationTaskITSMErrMsg } from 'modules/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskITSMMutationArgs,
  CreateRelocationTaskITSMSuccessResponse,
} from 'modules/warehouse/models'
import { useCreateRelocationTaskITSMMutation } from 'modules/warehouse/services/relocationTaskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
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
