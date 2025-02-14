import { AxiosResponse } from 'axios'
import { HistoryNomenclatureOperationsReportItemDTO } from 'features/reports/api/dto'
import { GetHistoryNomenclatureOperationsReportXlsxResponse } from 'features/reports/api/schemas'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetHistoryNomenclatureOperationsReportTransformedResponse =
  AntdPaginatedList<HistoryNomenclatureOperationsReportItemDTO>

export type GetHistoryNomenclatureOperationsReportXlsxTransformedResponse = {
  value: GetHistoryNomenclatureOperationsReportXlsxResponse
  meta?: { response?: AxiosResponse }
}
