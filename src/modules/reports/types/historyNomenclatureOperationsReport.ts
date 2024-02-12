import { AntdPaginatedList } from 'lib/antd/types'

import { HistoryNomenclatureOperationsReportListItemModel } from 'modules/reports/models'

export type GetHistoryNomenclatureOperationsReportTransformedSuccessResponse =
  AntdPaginatedList<HistoryNomenclatureOperationsReportListItemModel>
