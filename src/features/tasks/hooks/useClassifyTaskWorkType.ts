import { useClassifyTaskWorkTypeMutation } from 'features/tasks/api/endpoints/tasks.endpoints'
import { classifyTaskWorkTypeErrorMessage } from 'features/tasks/api/constants'
import { ClassifyTaskWorkTypeRequest, ClassifyTaskWorkTypeResponse } from 'features/tasks/api/schemas'
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

type UseClassifyTaskWorkTypeResult = CustomUseMutationResult<
  ClassifyTaskWorkTypeRequest,
  ClassifyTaskWorkTypeResponse
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
        showErrorNotification(classifyTaskWorkTypeErrorMessage)
      }
    }
  }, [state.error])

  return [mutation, state]
}
