import { GetAmountEquipmentSpentReportQueryArgs } from './getAmountEquipmentSpentReport.model'

export type GetAmountEquipmentSpentReportXlsxQueryArgs = Omit<
  GetAmountEquipmentSpentReportQueryArgs,
  'limit' | 'offset'
>

export type GetAmountEquipmentSpentReportXlsxSuccessResponse = string
