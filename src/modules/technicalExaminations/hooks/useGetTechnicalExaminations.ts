import { useEffect } from 'react'

import { CustomUseQueryHookResult, CustomUseQueryOptions } from 'lib/rtk-query/types'

import { getTechnicalExaminationsErrMsg } from 'modules/technicalExaminations/constants'
import {
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse,
} from 'modules/technicalExaminations/models'
import { useGetTechnicalExaminationsQuery } from 'modules/technicalExaminations/services/technicalExaminationsApi.service'

import { getErrorDetail, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

type UseGetTechnicalExaminationsResult = CustomUseQueryHookResult<
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse
>

type UseGetTechnicalExaminationsOptions = CustomUseQueryOptions<
  GetTechnicalExaminationsQueryArgs,
  GetTechnicalExaminationsSuccessResponse
>

export const useGetTechnicalExaminations = (
  args: GetTechnicalExaminationsQueryArgs,
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
