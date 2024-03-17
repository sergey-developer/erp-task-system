import { WorkGroupsMtsrReportModel } from 'modules/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'modules/reports/types'

import { IdType } from 'shared/types/common'

export type GetWorkGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
    supportGroups: IdType[]
  }>

export type GetWorkGroupsMtsrReportSuccessResponse = WorkGroupsMtsrReportModel
