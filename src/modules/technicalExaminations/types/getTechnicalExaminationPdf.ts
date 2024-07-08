import { AxiosResponse } from 'axios'

import { GetTechnicalExaminationPdfSuccessResponse } from 'modules/technicalExaminations/models'

export type GetTechnicalExaminationPdfTransformedSuccessResponse = {
  value: GetTechnicalExaminationPdfSuccessResponse
  meta?: { response?: AxiosResponse }
}
