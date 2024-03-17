import { IdType } from 'shared/types/common'

export type BaseMtsrReportItemModel = {
  id: IdType
  title: string
  averageExecutionTime: number
  returnedAmount: number
  allTasks: number
  completedTasks: number
  overdueTasks: number
}

export type GetMtsrReportBaseQueryArgs = Partial<{
  dateStart: string
  dateEnd: string
  customers: IdType[]
  ordering: string
}>
