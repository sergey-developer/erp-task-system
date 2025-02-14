import { AxiosResponse } from 'axios'

import { GetTechnicalExaminationPdfResponse } from '../schemas'

export type GetTechnicalExaminationPdfTransformedResponse = {
  value: GetTechnicalExaminationPdfResponse
  meta?: { response?: AxiosResponse }
}
