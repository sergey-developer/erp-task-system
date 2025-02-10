import { SupportGroupsMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseQueryArgs } from './baseMtsrReport.schema'

export type GetSupportGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
  }>

export type GetSupportGroupsMtsrReportSuccessResponse = SupportGroupsMtsrReportDTO
