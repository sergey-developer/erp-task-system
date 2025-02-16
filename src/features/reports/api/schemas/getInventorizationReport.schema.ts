import { RequestWithInventorization } from 'features/inventorizations/api/types'

import { Base64Type } from 'shared/types/common'

export type GetInventorizationReportRequest = RequestWithInventorization
export type GetInventorizationReportResponse = Base64Type
