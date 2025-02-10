import { UsersMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseQueryArgs } from './baseMtsrReport.schema'

export type GetUsersMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
    workGroups: IdType[]
  }>

export type GetUsersMtsrReportSuccessResponse = UsersMtsrReportDTO
