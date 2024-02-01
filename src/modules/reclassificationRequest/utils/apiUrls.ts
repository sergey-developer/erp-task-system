import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

import { ReclassificationRequestApiEnum } from '../constants'

export const cancelReclassificationRequestUrl = (id: IdType): string =>
  generateApiPath(ReclassificationRequestApiEnum.CancelReclassificationRequest, { id: String(id) })
