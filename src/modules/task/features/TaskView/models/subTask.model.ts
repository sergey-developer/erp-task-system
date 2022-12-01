import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

export type SubTaskModel = TaskDetailsModel & {
  parentId: number
}
