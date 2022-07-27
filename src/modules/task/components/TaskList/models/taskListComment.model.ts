import { BaseTaskCommentModel } from 'modules/task/models'

export type TaskListCommentModel = BaseTaskCommentModel & {
  task: number
  author: number
  updatedAt: string
}
