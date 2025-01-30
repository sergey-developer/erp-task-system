import { Base64Type } from 'shared/types/common'

import { GetAmountEquipmentSpentReportQueryArgs } from './getAmountEquipmentSpentReport.model'

export type GetAmountEquipmentSpentReportXlsxQueryArgs = Omit<
  GetAmountEquipmentSpentReportQueryArgs,
  'limit' | 'offset'
>

export type GetAmountEquipmentSpentReportXlsxSuccessResponse = Base64Type
