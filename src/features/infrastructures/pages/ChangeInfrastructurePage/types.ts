import { TaskDetailDTO } from 'features/tasks/api/dto'

export type ChangeInfrastructurePageLocationState = {
  task: Pick<TaskDetailDTO, 'infrastructureProject' | 'workType' | 'recordId' | 'id' | 'assignee'>
}
