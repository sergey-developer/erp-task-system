import { Base64Type } from 'shared/types/common'

import { GetHistoryNomenclatureOperationsReportQueryArgs } from './getHistoryNomenclatureOperationsReport.model'

export type GetHistoryNomenclatureOperationsReportXlsxQueryArgs = Omit<
  GetHistoryNomenclatureOperationsReportQueryArgs,
  'limit' | 'offset'
>

export type GetHistoryNomenclatureOperationsReportXlsxSuccessResponse = Base64Type
