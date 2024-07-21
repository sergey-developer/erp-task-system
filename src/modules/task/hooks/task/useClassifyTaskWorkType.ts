import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { classifyTaskWorkTypeErrMsg } from 'modules/task/constants/task'
import {
  ClassifyTaskWorkTypeMutationArgs,
  ClassifyTaskWorkTypeSuccessResponse,
} from 'modules/task/models'
import { useClassifyTaskWorkTypeMutation } from 'modules/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseClassifyTaskWorkTypeResult = CustomUseMutationResult<
  ClassifyTaskWorkTypeMutationArgs,
  ClassifyTaskWorkTypeSuccessResponse
>

export const useClassifyTaskWorkType = (): UseClassifyTaskWorkTypeResult => {
  const [mutation, state] = useClassifyTaskWorkTypeMutation()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (
        isBadRequestError(state.error) ||
        isForbiddenError(state.error) ||
        isNotFoundError(state.error)
      ) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(classifyTaskWorkTypeErrMsg)
      }
    }
  }, [state.error])

  return [mutation, state]
}
