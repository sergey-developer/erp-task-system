import { CommentAuthorModel, FileModel } from 'shared/interfaces/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

import {
  ResolutionCodeEnum,
  SuspendReasonEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from '../constants'
import { BaseTaskCommentModel } from '../models'
import { Task } from '../taskList/models'

export type TaskCommentDetailModel = BaseTaskCommentModel & {
  author: CommentAuthorModel
}

export type TaskAttachmentModel = {
  id: number
  source: FileModel
  externalId: string
  task: number
  extension?: MaybeNull<string>
}

export type TaskDetailsModel = {
  id: number
  comments: Array<TaskCommentDetailModel>
  assignee: AssigneeModel
  attachments: Array<TaskAttachmentModel>
  createdAt: string
  updatedAt: string
  type: TaskTypeEnum
  businessOperation: string
  contactService: string
  itService: string
  isFailure: boolean
  isMass: boolean
  isOlaBreached: boolean
  productClassifier1: string
  productClassifier2: string
  productClassifier3: string
  recordId: string
  isSlaBreached: boolean
  status: TaskStatusEnum
  supportingService: string
  title: string
  name: string
  initialImpact?: number
  description?: string
  olaNextBreachTime?: MaybeNull<string>
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
  isReturned?: boolean
  workGroup?: MaybeNull<number>
  parentTask?: MaybeNull<number>
}

export type GetOneTaskResponseModel = TaskDetailsModel

export type GetOneTaskQueryArgsModel = Task['id']
