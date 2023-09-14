import { SupportGroupModel } from 'modules/supportGroup/models'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { TaskAssigneeModel, TaskResponseTimeModel, TaskWorkGroupModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type BaseTaskModel = {
  id: IdType
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

  workGroup: MaybeNull<Pick<TaskWorkGroupModel, 'id' | 'name'>>
  assignee: MaybeNull<
    Pick<TaskAssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName' | 'avatar'>
  >
  responseTime: MaybeNull<Pick<TaskResponseTimeModel, 'progress' | 'timedelta' | 'value'>>
  supportGroup: MaybeNull<Pick<SupportGroupModel, 'id' | 'name'>>
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
