import { AxiosResponse } from 'axios'

import { GetInventorizationReportSuccessResponse } from 'modules/reports/models'

export type GetInventorizationReportTransformedSuccessResponse = {
  value: GetInventorizationReportSuccessResponse
  meta?: { response?: AxiosResponse }
}
