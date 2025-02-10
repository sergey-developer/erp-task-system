import { AxiosResponse } from 'axios'
import { GetInventorizationReportSuccessResponse } from 'features/reports/api/dto'

export type GetInventorizationReportTransformedSuccessResponse = {
  value: GetInventorizationReportSuccessResponse
  meta?: { response?: AxiosResponse }
}
