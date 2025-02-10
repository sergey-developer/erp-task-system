import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/task/constants/task'
import { TaskAssigneeModel, TaskResponseTimeModel, TaskWorkGroupModel } from 'features/task/models'

import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskListItemModel = {
  id: IdType
  subtasksCounter: {
    completed: number
    all: number
  }
  olaNextBreachTime: string
  createdAt: string
  type: TaskTypeEnum
  recordId: string
  status: TaskStatusEnum
  title: string

  name: MaybeNull<string>
  extendedStatus: MaybeNull<TaskExtendedStatusEnum>
  lastComment: MaybeNull<string>
  assignee: MaybeNull<TaskAssigneeModel>
  workGroup: MaybeNull<TaskWorkGroupModel>
  supportGroup: MaybeNull<Pick<SupportGroupDTO, 'id' | 'name'>>
  olaStatus: MaybeNull<TaskOlaStatusEnum>
  responseTime: MaybeNull<Pick<TaskResponseTimeModel, 'progress' | 'timedelta' | 'value'>>
}

export type TasksModel = TaskListItemModel[]
