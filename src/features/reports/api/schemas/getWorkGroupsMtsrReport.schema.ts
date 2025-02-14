import { WorkGroupsMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseRequest } from './baseMtsrReport.schema'

export type GetWorkGroupsMtsrReportRequest = GetMtsrReportBaseRequest &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
  }>

export type GetWorkGroupsMtsrReportResponse = WorkGroupsMtsrReportDTO
