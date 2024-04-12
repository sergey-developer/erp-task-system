import { IdType } from 'shared/types/common'
import { ExtendSortKey } from 'shared/types/sort'

export type BaseMtsrReportItemModel = {
  id: IdType
  title: string
  averageExecutionTime: string
  returnedAmount: number
  allTasks: number
  completedTasks: number
  overdueTasks: number
}

export type GetMtsrReportBaseSortKey =
  | 'id'
  | 'title'
  | 'average_execution_time'
  | 'returned_amount'
  | 'all_tasks'
  | 'completed_tasks'
  | 'overdue_tasks'

export type GetMtsrReportBaseSortValue = ExtendSortKey<GetMtsrReportBaseSortKey>

export type GetMtsrReportBaseQueryArgs = Partial<{
  dateStart: string
  dateEnd: string
  customers: IdType[]
  ordering: GetMtsrReportBaseSortValue
}>
