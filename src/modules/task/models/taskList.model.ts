import { BaseTaskModel, TaskAssigneeModel } from 'modules/task/models'

import { MaybeNull } from 'shared/interfaces/utils'

export type TaskListItemModel = BaseTaskModel & {
  assignee: MaybeNull<TaskAssigneeModel>
  lastComment: string
  subtasksCounter: {
    completed: number
    all: number
  }
}
