import { TechnicalExaminationsEndpointsEnum } from 'features/technicalExaminations/constants'
import { TechnicalExaminationRequestArgs } from 'features/technicalExaminations/types'

import { generateApiPath } from 'shared/utils/api'

export const makeGetTechnicalExaminationUrl = ({
  technicalExaminationId,
}: TechnicalExaminationRequestArgs): string =>
  generateApiPath(TechnicalExaminationsEndpointsEnum.GetTechnicalExamination, {
    id: String(technicalExaminationId),
  })
