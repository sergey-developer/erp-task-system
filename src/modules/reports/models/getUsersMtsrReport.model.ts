import { UsersMtsrReportModel } from 'modules/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'modules/reports/types'

import { IdType } from 'shared/types/common'

export type GetUsersMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
    workGroups: IdType[]
  }>

export type GetUsersMtsrReportSuccessResponse = UsersMtsrReportModel
