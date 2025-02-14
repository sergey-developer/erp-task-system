import { AxiosResponse } from 'axios'
import { GetTechnicalExaminationPdfResponse } from 'features/technicalExaminations/models'

export type GetTechnicalExaminationPdfTransformedResponse = {
  value: GetTechnicalExaminationPdfResponse
  meta?: { response?: AxiosResponse }
}
