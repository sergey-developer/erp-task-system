import { useEffect } from 'react'

import { CustomUseMutationResult } from 'lib/rtk-query/types'

import { classifyTaskWorkTypeErrMsg } from 'features/task/constants/task'
import {
  ClassifyTaskWorkTypeMutationArgs,
  ClassifyTaskWorkTypeSuccessResponse,
} from 'features/task/models'
import { useClassifyTaskWorkTypeMutation } from 'features/task/services/taskApi.service'

import {
  getErrorDetail,
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
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
