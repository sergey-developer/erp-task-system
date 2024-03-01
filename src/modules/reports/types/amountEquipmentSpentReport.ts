import { AxiosResponse } from 'axios'

import { AntdPaginatedList } from 'lib/antd/types'

import {
  AmountEquipmentSpentReportListItemModel,
  GetAmountEquipmentSpentReportXlsxSuccessResponse,
} from 'modules/reports/models'

export type GetAmountEquipmentSpentReportTransformedSuccessResponse =
  AntdPaginatedList<AmountEquipmentSpentReportListItemModel>

export type GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse = {
  value: GetAmountEquipmentSpentReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
