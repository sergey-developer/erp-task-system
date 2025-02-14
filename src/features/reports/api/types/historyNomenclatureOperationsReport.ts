import { AxiosResponse } from 'axios'
import { HistoryNomenclatureOperationsReportItemDTO } from 'features/reports/api/dto'
import { GetHistoryNomenclatureOperationsReportXlsxResponse } from 'features/reports/api/schemas'

import { AntdPagination } from 'lib/antd/types'

export type GetHistoryNomenclatureOperationsReportTransformedResponse =
  AntdPagination<HistoryNomenclatureOperationsReportItemDTO>

export type GetHistoryNomenclatureOperationsReportXlsxTransformedResponse = {
  value: GetHistoryNomenclatureOperationsReportXlsxResponse
  meta?: { response?: AxiosResponse }
}
