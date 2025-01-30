import { TaskModel } from 'features/task/models'

export type RelocationTasksTabProps = {
  task: Pick<
    TaskModel,
    'id' | 'assignee' | 'recordId' | 'olaNextBreachTime' | 'olaEstimatedTime' | 'olaStatus' | 'shop'
  >
}
