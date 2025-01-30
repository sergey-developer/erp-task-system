import { InfrastructuresApiEnum } from 'features/infrastructures/constants'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const makeUpdateInfrastructureOrderFormWorkApiUrl = (workId: IdType): string =>
  generateApiPath(InfrastructuresApiEnum.UpdateInfrastructureOrderFormWork, {
    workId: String(workId),
  })
