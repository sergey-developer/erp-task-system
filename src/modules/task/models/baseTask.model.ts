import {
  ResolutionCodeEnum,
  SuspendReasonEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { MaybeNull } from 'shared/interfaces/utils'

export type BaseTaskModel = {
  id: number
  createdAt: string
  updatedAt: string
  type: TaskTypeEnum
  businessOperation: string
  contactService: string
  itService: string
  isFailure: boolean
  isMass: boolean
  productClassifier1: string
  productClassifier2: string
  productClassifier3: string
  recordId: string
  status: TaskStatusEnum
  supportingService: string
  title: string
  name: string
  isSlaBreached: boolean
  isOlaBreached: boolean
  olaStatus: TaskOlaStatusEnum
  extendedStatus: TaskExtendedStatusEnum
  initialImpact: 1 | 2 | 3 | 4
  severity: 1 | 2 | 3 | 4
  priorityCode: 1 | 2 | 3 | 4

  olaNextBreachTime?: MaybeNull<string>
  description?: string
  parentExternalId?: string
  parentInteractionExternalId?: string
  parentInteractionPortalExternalId?: string
  parentTaskExternalId?: string
  slaNextBreachAt?: MaybeNull<string>
  isPendingUpdate?: MaybeNull<boolean>
  resolutionCode?: ResolutionCodeEnum
  techResolution?: string
  userResolution?: string
  isSuspended?: MaybeNull<boolean>
  suspendReason?: SuspendReasonEnum
  suspendUntilTime?: MaybeNull<string>
  address?: string
  city?: string
  country?: string
  latitude?: string
  longitude?: string
  state?: string
  zipCode?: string
  parentTask?: MaybeNull<number>
  isReturned?: boolean
}
