import { WorkGroupsMtsrReportModel } from 'features/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'features/reports/types'

import { IdType } from 'shared/types/common'

export type GetWorkGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
  }>

export type GetWorkGroupsMtsrReportSuccessResponse = WorkGroupsMtsrReportModel
