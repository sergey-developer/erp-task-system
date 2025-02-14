import { getTechnicalExaminationsErrMsg } from 'features/technicalExaminations/constants'
import {
  GetTechnicalExaminationsRequest,
  GetTechnicalExaminationsResponse,
} from 'features/technicalExaminations/models'
import { useGetTechnicalExaminationsQuery } from 'features/technicalExaminations/services/technicalExaminationsApi.service'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTechnicalExaminationsResult = CustomUseQueryHookResult<
  GetTechnicalExaminationsRequest,
  GetTechnicalExaminationsResponse
>

type UseGetTechnicalExaminationsOptions = CustomUseQueryOptions<
  GetTechnicalExaminationsRequest,
  GetTechnicalExaminationsResponse
>

export const useGetTechnicalExaminations = (
  args: GetTechnicalExaminationsRequest,
  options?: UseGetTechnicalExaminationsOptions,
): UseGetTechnicalExaminationsResult => {
  const state = useGetTechnicalExaminationsQuery(args, options)

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isBadRequestError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTechnicalExaminationsErrMsg)
      }
    }
  }, [state.error])

  return state
}
