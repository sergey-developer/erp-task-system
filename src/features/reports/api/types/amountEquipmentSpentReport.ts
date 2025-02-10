import { AxiosResponse } from 'axios'

import { AntdPaginatedList } from 'lib/antd/types'

import { AmountEquipmentSpentReportItemDTO } from '../dto'
import { GetAmountEquipmentSpentReportXlsxSuccessResponse } from '../schemas'

export type GetAmountEquipmentSpentReportTransformedSuccessResponse =
  AntdPaginatedList<AmountEquipmentSpentReportItemDTO>

export type GetAmountEquipmentSpentReportXlsxTransformedSuccessResponse = {
  value: GetAmountEquipmentSpentReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
