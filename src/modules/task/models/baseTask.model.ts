import { SupportGroupModel } from 'modules/supportGroup/models'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants'
import { WorkGroupListItemModel } from 'modules/workGroup/models'

import { MaybeNull } from 'shared/types/utils'

import { TaskAssigneeModel } from './taskAssignee.model'

export type TaskWorkGroupModel = Pick<WorkGroupListItemModel, 'id' | 'name'>

export type TaskResponseTimeModel = {
  progress: number
  timedelta: number
  value: string
}

export type BaseTaskModel = {
  id: number
  createdAt: string
  type: TaskTypeEnum
  contactService: string
  productClassifier1: string
  productClassifier2: string
  productClassifier3: string
  recordId: string
  status: TaskStatusEnum
  title: string
  name: string
  olaStatus: TaskOlaStatusEnum
  extendedStatus: TaskExtendedStatusEnum
  initialImpact: 1 | 2 | 3 | 4
  severity: 1 | 2 | 3 | 4
  priorityCode: 1 | 2 | 3 | 4
  workGroup: MaybeNull<TaskWorkGroupModel>
  assignee: MaybeNull<TaskAssigneeModel>
  responseTime: MaybeNull<TaskResponseTimeModel>
  supportGroup: MaybeNull<SupportGroupModel>
  contactPhone: MaybeNull<string>
  portablePhone: MaybeNull<string>
  olaNextBreachTime: MaybeNull<string>
  description: MaybeNull<string>
  techResolution: MaybeNull<string>
  userResolution: MaybeNull<string>
  address: MaybeNull<string>
  latitude: MaybeNull<string>
  longitude: MaybeNull<string>
}
