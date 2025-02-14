import { SupportGroupsMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseRequest } from './baseMtsrReport.schema'

export type GetSupportGroupsMtsrReportRequest = GetMtsrReportBaseRequest &
  Partial<{
    macroregions: IdType[]
  }>

export type GetSupportGroupsMtsrReportResponse = SupportGroupsMtsrReportDTO
