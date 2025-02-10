import { WorkGroupsMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseQueryArgs } from './baseMtsrReport.schema'

export type GetWorkGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
  }>

export type GetWorkGroupsMtsrReportSuccessResponse = WorkGroupsMtsrReportDTO
