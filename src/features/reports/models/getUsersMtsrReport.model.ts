import { UsersMtsrReportModel } from 'features/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'features/reports/types'

import { IdType } from 'shared/types/common'

export type GetUsersMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
    workGroups: IdType[]
  }>

export type GetUsersMtsrReportSuccessResponse = UsersMtsrReportModel
