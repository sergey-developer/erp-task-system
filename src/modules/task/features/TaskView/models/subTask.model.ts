import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

export type SubTaskModel = Omit<TaskDetailsModel, 'workGroup'> & {
  workGroup: string
  parentId: number
}
