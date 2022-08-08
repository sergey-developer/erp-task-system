import {
  ResolutionCodeEnum,
  SuspendReasonEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/enums'
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

  olaNextBreachTime?: MaybeNull<string>
  description?: string
  parentExternalId?: string
  parentInteractionExternalId?: string
  parentInteractionPortalExternalId?: string
  parentTaskExternalId?: string
  priorityCode?: MaybeNull<number>
  slaNextBreachAt?: MaybeNull<string>
  severity?: MaybeNull<number>
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
}
