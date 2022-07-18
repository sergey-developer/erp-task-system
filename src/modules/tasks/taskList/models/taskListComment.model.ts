import { BaseTaskCommentModel } from 'modules/tasks/models'

export type TaskListCommentModel = BaseTaskCommentModel & {
  task: number
  author: number
  updatedAt: string
}
