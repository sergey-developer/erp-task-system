import { getTechnicalExaminationsErrMsg } from 'features/technicalExaminations/api/constants'
import { useGetTechnicalExaminationsQuery } from 'features/technicalExaminations/api/endpoints/technicalExaminations.endpoints'
import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetTechnicalExaminationsRequest, GetTechnicalExaminationsResponse } from '../api/schemas'

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
