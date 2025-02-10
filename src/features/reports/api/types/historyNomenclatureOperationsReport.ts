import { AxiosResponse } from 'axios'
import {
  GetHistoryNomenclatureOperationsReportXlsxSuccessResponse,
  HistoryNomenclatureOperationsReportItemDTO,
} from 'features/reports/api/dto'

import { AntdPaginatedList } from 'lib/antd/types'

export type GetHistoryNomenclatureOperationsReportTransformedSuccessResponse =
  AntdPaginatedList<HistoryNomenclatureOperationsReportItemDTO>

export type GetHistoryNomenclatureOperationsReportXlsxTransformedSuccessResponse = {
  value: GetHistoryNomenclatureOperationsReportXlsxSuccessResponse
  meta?: { response?: AxiosResponse }
}
