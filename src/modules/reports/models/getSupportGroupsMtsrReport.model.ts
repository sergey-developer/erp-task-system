import { SupportGroupsMtsrReportModel } from 'modules/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'modules/reports/types'

import { IdType } from 'shared/types/common'

export type GetSupportGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
  }>

export type GetSupportGroupsMtsrReportSuccessResponse = SupportGroupsMtsrReportModel
