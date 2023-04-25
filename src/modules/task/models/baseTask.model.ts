import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { WorkGroupListItemModel } from 'modules/workGroup/models'

import { MaybeNull } from 'shared/interfaces/utils'
import { SupportGroupModel } from 'shared/models'

export type TaskWorkGroup = Pick<WorkGroupListItemModel, 'id' | 'name'>

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
  workGroup: MaybeNull<TaskWorkGroup>
  responseTime: MaybeNull<{
    progress: number
    timedelta: number
    value: string
  }>
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
