import { UsersMtsrReportDTO } from 'features/reports/api/dto'

import { IdType } from 'shared/types/common'

import { GetMtsrReportBaseRequest } from './baseMtsrReport.schema'

export type GetUsersMtsrReportRequest = GetMtsrReportBaseRequest &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
    workGroups: IdType[]
  }>

export type GetUsersMtsrReportResponse = UsersMtsrReportDTO
