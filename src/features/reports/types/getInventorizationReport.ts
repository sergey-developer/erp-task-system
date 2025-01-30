import { AxiosResponse } from 'axios'

import { GetInventorizationReportSuccessResponse } from 'features/reports/models'

export type GetInventorizationReportTransformedSuccessResponse = {
  value: GetInventorizationReportSuccessResponse
  meta?: { response?: AxiosResponse }
}
