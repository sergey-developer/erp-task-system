import { TechnicalExaminationsApiEnum } from 'modules/technicalExaminations/constants'
import { TechnicalExaminationRequestArgs } from 'modules/technicalExaminations/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetTechnicalExaminationUrl = ({
  technicalExaminationId,
}: TechnicalExaminationRequestArgs): string =>
  generateApiPath(TechnicalExaminationsApiEnum.GetTechnicalExamination, {
    id: String(technicalExaminationId),
  })
