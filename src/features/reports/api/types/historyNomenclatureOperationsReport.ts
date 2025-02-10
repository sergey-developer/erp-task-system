import { AxiosResponse } from 'axios'
import { HistoryNomenclatureOperationsReportItemDTO } from 'features/reports/api/dto'
import { GetHistoryNomenclatureOperationsReportXlsxSuccessResponse } from 'features/reports/api/schemas'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetHistoryNomenclatureOperationsReportTransformedSuccessResponse =
  AntdPaginatedList<HistoryNomenclatureOperationsReportItemDTO>

export type GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse = {
  value: GetHistoryNomenclatureOperationsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
