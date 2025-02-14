import { Base64Type } from 'shared/types/common'

import { GetHistoryNomenclatureOperationsReportRequest } from './getHistoryNomenclatureOperationsReport.schema'

export type GetHistoryNomenclatureOperationsReportXlsxRequest = Omit<
  GetHistoryNomenclatureOperationsReportRequest,
  'limit' | 'offset'
>

export type GetHistoryNomenclatureOperationsReportXlsxResponse = Base64Type
