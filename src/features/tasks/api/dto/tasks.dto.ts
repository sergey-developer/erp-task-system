import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { TaskAssigneeDTO, TaskResponseTimeDTO, TaskWorkGroupDTO } from 'features/tasks/api/dto'

import { SupportGroupDTO } from 'shared/supportGroups/api/dto'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TaskDTO = {
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
  assignee: MaybeNull<TaskAssigneeDTO>
  workGroup: MaybeNull<TaskWorkGroupDTO>
  supportGroup: MaybeNull<Pick<SupportGroupDTO, 'id' | 'name'>>
  olaStatus: MaybeNull<TaskOlaStatusEnum>
  responseTime: MaybeNull<Pick<TaskResponseTimeDTO, 'progress' | 'timedelta' | 'value'>>
}

export type TasksDTO = TaskDTO[]
