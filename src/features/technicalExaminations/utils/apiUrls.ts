import { TechnicalExaminationsApiEnum } from 'features/technicalExaminations/constants'
import { TechnicalExaminationRequestArgs } from 'features/technicalExaminations/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetTechnicalExaminationUrl = ({
  technicalExaminationId,
}: TechnicalExaminationRequestArgs): string =>
  generateApiPath(TechnicalExaminationsApiEnum.GetTechnicalExamination, {
    id: String(technicalExaminationId),
  })
