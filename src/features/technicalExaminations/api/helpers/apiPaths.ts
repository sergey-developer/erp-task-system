import { TechnicalExaminationsApiPathsEnum } from 'features/technicalExaminations/api/constants'
import { RequestWithTechnicalExamination } from 'features/technicalExaminations/api/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetTechnicalExaminationApiPath = ({
  technicalExaminationId,
}: RequestWithTechnicalExamination): string =>
  generateApiPath(TechnicalExaminationsApiPathsEnum.GetTechnicalExamination, {
    id: String(technicalExaminationId),
  })
