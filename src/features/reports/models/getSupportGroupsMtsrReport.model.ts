import { SupportGroupsMtsrReportModel } from 'features/reports/models'
import { GetMtsrReportBaseQueryArgs } from 'features/reports/types'

import { IdType } from 'shared/types/common'

export type GetSupportGroupsMtsrReportQueryArgs = GetMtsrReportBaseQueryArgs &
  Partial<{
    macroregions: IdType[]
  }>

export type GetSupportGroupsMtsrReportSuccessResponse = SupportGroupsMtsrReportModel
