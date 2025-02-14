import { RequestWithTechnicalExamination } from 'features/technicalExaminations/api/types'

import { Base64Type } from 'shared/types/common'

export type GetTechnicalExaminationPdfRequest = RequestWithTechnicalExamination
export type GetTechnicalExaminationPdfResponse = Base64Type
