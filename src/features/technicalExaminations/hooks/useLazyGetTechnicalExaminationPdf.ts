import { getTechnicalExaminationPdfErrMsg } from 'features/technicalExaminations/api/constants'
import { useLazyGetTechnicalExaminationPdfQuery } from 'features/technicalExaminations/api/endpoints/technicalExaminations.endpoints'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

import { GetTechnicalExaminationPdfRequest } from '../api/schemas'
import { GetTechnicalExaminationPdfTransformedResponse } from '../api/types'

type UseGetTechnicalExaminationPdfResult = CustomUseLazyQueryHookResult<
  GetTechnicalExaminationPdfRequest,
  GetTechnicalExaminationPdfTransformedResponse
>

export const useLazyGetTechnicalExaminationPdf = (): UseGetTechnicalExaminationPdfResult => {
  const [trigger, state] = useLazyGetTechnicalExaminationPdfQuery()

  useEffect(() => {
    if (isErrorResponse(state.error)) {
      if (isNotFoundError(state.error)) {
        showErrorNotification(getErrorDetail(state.error))
      } else {
        showErrorNotification(getTechnicalExaminationPdfErrMsg)
      }
    }
  }, [state.error])

  return [trigger, state]
}
