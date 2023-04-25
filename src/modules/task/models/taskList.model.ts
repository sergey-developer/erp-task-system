import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'

export type TaskListItemModel = BaseTaskModel & {
  assignee: TaskAssigneeModel
  lastComment: string
  subtasksCounter: {
    completed: number
    all: number
  }
}
