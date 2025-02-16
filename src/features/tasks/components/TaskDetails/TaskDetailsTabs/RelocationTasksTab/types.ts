import { TaskDetailDTO } from 'features/tasks/api/dto'

export type RelocationTasksTabProps = {
  task: Pick<
    TaskDetailDTO,
    'id' | 'assignee' | 'recordId' | 'olaNextBreachTime' | 'olaEstimatedTime' | 'olaStatus' | 'shop'
  >
}
