import { AntdPaginatedList } from 'lib/antd/types'

import { AmountEquipmentSpentReportListItemModel } from 'modules/reports/models'

export type GetAmountEquipmentSpentReportTransformedSuccessResponse =
  AntdPaginatedList<AmountEquipmentSpentReportListItemModel>
