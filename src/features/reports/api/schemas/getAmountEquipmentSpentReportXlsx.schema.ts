import { Base64Type } from 'shared/types/common'

import { GetAmountEquipmentSpentReportRequest } from './getAmountEquipmentSpentReport.schema'

export type GetAmountEquipmentSpentReportXlsxRequest = Omit<
  GetAmountEquipmentSpentReportRequest,
  'limit' | 'offset'
>

export type GetAmountEquipmentSpentReportXlsxResponse = Base64Type
