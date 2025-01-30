import { AxiosResponse } from 'axios'

import { AntdPaginatedList } from 'lib/antd/types'

import {
  GetHistoryNomenclatureOperationsReportXlsxSuccessResponse,
  HistoryNomenclatureOperationsReportListItemModel,
} from 'features/reports/models'

export type GetHistoryNomenclatureOperationsReportTransformedSuccessResponse =
  AntdPaginatedList<HistoryNomenclatureOperationsReportListItemModel>

export type GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse = {
  value: GetHistoryNomenclatureOperationsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
