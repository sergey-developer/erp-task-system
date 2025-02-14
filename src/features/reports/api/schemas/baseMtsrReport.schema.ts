import { IdType } from 'shared/types/common'
import { ExtendSortKey } from 'shared/types/sort'

export type GetMtsrReportBaseSortKey =
  | 'id'
  | 'title'
  | 'average_execution_time'
  | 'returned_amount'
  | 'all_tasks'
  | 'completed_tasks'
  | 'overdue_tasks'

export type GetMtsrReportBaseSortValue = ExtendSortKey<GetMtsrReportBaseSortKey>

export type GetMtsrReportBaseRequest = Partial<{
  dateStart: string
  dateEnd: string
  customers: IdType[]
  ordering: GetMtsrReportBaseSortValue
}>
