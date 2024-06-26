import { BaseTaskModel } from 'modules/task/models'

export type TaskListItemModel = BaseTaskModel & {
  lastComment: string
  subtasksCounter: {
    completed: number
    all: number
  }
}

export type TasksModel = TaskListItemModel[]
