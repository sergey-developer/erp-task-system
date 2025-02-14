import { AxiosResponse } from 'axios'
import { GetInventorizationReportResponse } from 'features/reports/api/schemas'

export type GetInventorizationReportTransformedResponse = {
  value: GetInventorizationReportResponse
  meta?: { response?: AxiosResponse }
}
