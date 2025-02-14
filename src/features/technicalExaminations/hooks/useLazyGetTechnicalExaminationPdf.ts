import { getTechnicalExaminationPdfErrMsg } from 'features/technicalExaminations/constants'
import { GetTechnicalExaminationPdfRequest } from 'features/technicalExaminations/models'
import { useLazyGetTechnicalExaminationPdfQuery } from 'features/technicalExaminations/services/technicalExaminationsApi.service'
import { GetTechnicalExaminationPdfTransformedResponse } from 'features/technicalExaminations/types'
import { useEffect } from 'react'

import { CustomUseLazyQueryHookResult } from 'lib/rtk-query/types'

import { getErrorDetail, isErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { showErrorNotification } from 'shared/utils/notifications'

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
