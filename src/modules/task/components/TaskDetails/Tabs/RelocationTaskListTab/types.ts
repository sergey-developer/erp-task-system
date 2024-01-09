import { TaskModel } from 'modules/task/models'

export type RelocationTaskListTabProps = {
  task: Pick<
    TaskModel,
    'id' | 'assignee' | 'recordId' | 'olaNextBreachTime' | 'olaEstimatedTime' | 'olaStatus' | 'shop'
  >
}
