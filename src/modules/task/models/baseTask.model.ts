import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { MaybeNull } from 'shared/interfaces/utils'

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

  contactPhone?: string
  portablePhone?: string
  olaNextBreachTime?: MaybeNull<string>
  description?: string
  techResolution?: string
  userResolution?: string
  address?: string
  latitude?: string
  longitude?: string
}
