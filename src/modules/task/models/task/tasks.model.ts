import { SupportGroupModel } from 'modules/supportGroup/models'
import { BaseTaskModel } from 'modules/task/models'

import { MaybeNull } from 'shared/types/utils'

export type TaskListItemModel = BaseTaskModel & {
  lastComment: string
  subtasksCounter: {
    completed: number
    all: number
  }

  supportGroup: MaybeNull<Pick<SupportGroupModel, 'id' | 'name'>>
}

export type TasksModel = TaskListItemModel[]
