import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { ReclassificationRequestsEndpointsEnum } from '../constants'

export const makeCancelReclassificationRequestEndpoint = (id: IdType): string =>
  generateApiPath(ReclassificationRequestsEndpointsEnum.CancelReclassificationRequest, {
    id: String(id),
  })
