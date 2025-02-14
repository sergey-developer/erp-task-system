import { AxiosResponse } from 'axios'

import { AntdPagination } from 'lib/antd/types'

import { AmountEquipmentSpentReportItemDTO } from '../dto'
import { GetAmountEquipmentSpentReportXlsxResponse } from '../schemas'

export type GetAmountEquipmentSpentReportTransformedResponse =
  AntdPagination<AmountEquipmentSpentReportItemDTO>

export type GetAmountEquipmentSpentReportXlsxTransformedResponse = {
  value: GetAmountEquipmentSpentReportXlsxResponse
  meta?: { response?: AxiosResponse }
}
