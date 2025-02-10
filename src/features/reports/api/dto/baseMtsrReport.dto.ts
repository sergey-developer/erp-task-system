import { IdType } from 'shared/types/common'

export type BaseMtsrReportItemDTO = {
  id: IdType
  title: string
  averageExecutionTime: string
  returnedAmount: number
  allTasks: number
  completedTasks: number
  overdueTasks: number
}
