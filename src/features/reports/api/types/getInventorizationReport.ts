import { AxiosResponse } from 'axios'
import { GetInventorizationReportSuccessResponse } from 'features/reports/api/schemas'

export type GetInventorizationReportTransformedSuccessResponse = {
  value: GetInventorizationReportSuccessResponse
  meta?: { response?: AxiosResponse }
}
