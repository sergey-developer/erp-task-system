import { AxiosResponse } from 'axios'

import { GetTechnicalExaminationPdfSuccessResponse } from 'features/technicalExaminations/models'

export type GetTechnicalExaminationPdfTransformedSuccessResponse = {
  value: GetTechnicalExaminationPdfSuccessResponse
  meta?: { response?: AxiosResponse }
}
