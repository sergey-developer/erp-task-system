import { GetHistoryNomenclatureOperationsReportQueryArgs } from './getHistoryNomenclatureOperationsReport.model'

export type GetHistoryNomenclatureOperationsReportXlsxQueryArgs = Omit<
  GetHistoryNomenclatureOperationsReportQueryArgs,
  'limit' | 'offset'
>

export type GetHistoryNomenclatureOperationsReportXlsxSuccessResponse = string
