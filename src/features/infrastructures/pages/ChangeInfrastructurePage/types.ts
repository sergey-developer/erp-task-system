import { TaskModel } from 'features/task/models'

export type ChangeInfrastructurePageLocationState = {
  task: Pick<TaskModel, 'infrastructureProject' | 'workType' | 'recordId' | 'id' | 'assignee'>
}
