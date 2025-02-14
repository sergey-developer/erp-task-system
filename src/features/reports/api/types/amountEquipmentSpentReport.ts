import { AxiosResponse } from 'axios'

import { AntdPaginatedList } from 'lib/antd/types'

import { AmountEquipmentSpentReportItemDTO } from '../dto'
import { GetAmountEquipmentSpentReportXlsxResponse } from '../schemas'

export type GetAmountEquipmentSpentReportTransformedResponse =
  AntdPaginatedList<AmountEquipmentSpentReportItemDTO>

export type GetAmountEquipmentSpentReportXlsxTransformedResponse = {
  value: GetAmountEquipmentSpentReportXlsxResponse
  meta?: { response?: AxiosResponse }
}
