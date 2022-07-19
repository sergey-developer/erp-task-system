import {
  ResolutionCodeEnum,
  SuspendReasonEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/tasks/constants'
import { WorkGroupListItemModel } from 'modules/workGroups/workGroupList/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

import { TaskListCommentModel } from './taskListComment.model'
import { TaskReclassificationRequestModel } from './taskReclassificationRequest.model'

export type TaskListItemModel = {
  id: number
  comment: TaskListCommentModel
  reclassificationRequest: TaskReclassificationRequestModel
  assignee: Pick<AssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  workGroup: WorkGroupListItemModel
  createdAt: string
  updatedAt: string
  type: TaskTypeEnum
  businessOperation: string
  contactService: string
  description?: string
  itService: string
  initialImpact?: MaybeNull<number>
  isFailure: boolean
  isMass: boolean
  isOlaBreached: boolean
  olaNextBreachTime?: MaybeNull<string>
  parentExternalId?: string
  parentInteractionExternalId?: string
  parentInteractionPortalExternalId?: string
  parentTaskExternalId?: string
  priorityCode?: MaybeNull<number>
  productClassifier1: string
  productClassifier2: string
  productClassifier3: string
  recordId: string
  isSlaBreached: boolean
  slaNextBreachAt?: MaybeNull<string>
  severity?: MaybeNull<number>
  status: TaskStatusEnum
  supportingService: string
  title: string
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
  name: string
  latitude?: string
  longitude?: string
  state?: string
  zipCode?: string
  parentTask?: MaybeNull<number>
}
