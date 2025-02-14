import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { ReclassificationRequestsApiPathsEnum } from '../constants'

export const makeCancelReclassificationRequestApiPath = (id: IdType): string =>
  generateApiPath(ReclassificationRequestsApiPathsEnum.CancelReclassificationRequest, {
    id: String(id),
  })
