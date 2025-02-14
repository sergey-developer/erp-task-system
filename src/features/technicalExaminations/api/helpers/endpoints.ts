import { TechnicalExaminationsEndpointsEnum } from 'features/technicalExaminations/api/constants'
import { RequestWithTechnicalExamination } from 'features/technicalExaminations/api/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetTechnicalExaminationEndpoint = ({
  technicalExaminationId,
}: RequestWithTechnicalExamination): string =>
  generateApiPath(TechnicalExaminationsEndpointsEnum.GetTechnicalExamination, {
    id: String(technicalExaminationId),
  })
