import { WorkGroupModel } from 'modules/workGroups/models'
import { PaginatedListResponse } from 'shared/interfaces/api'
import { AssigneeModel } from 'shared/interfaces/models'

import {
  FastFilterEnum,
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
  ResolutionCodeEnum,
  SmartSortEnum,
  SuspendReasonEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from '../constants'
import { BaseTaskCommentModel } from '../models'

export type GetTaskListBaseApiResponse = PaginatedTaskList

// todo: вынести трансформацию ответа под ант пагинацию в общий модуль
export type GetTaskListTransformedApiResponse = {
  pagination: {
    current: number
    total: number
    pageSize: number
  }
  results: Task[]
}

export type PaginatedTaskList = PaginatedListResponse<Task>

export type GetTaskListApiArg = {
  dateFrom?: string
  dateTo?: string
  filter?: FastFilterEnum
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  smartSearchAssignee?: string
  smartSearchDescription?: string
  smartSearchName?: string
  smartSort?: SmartSortEnum
  status?: TaskStatusEnum[]
  taskId?: string
  userId?: number
  workGroupId?: number
}

export type Comment = BaseTaskCommentModel & {
  author: number
}

export type ReclassificationRequest = {
  id: number
  createdAt: string
  updatedAt: string
  reclassificationReason: ReclassificationReasonEnum
  textComment: string
  status: ReclassificationRequestStatusEnum
  task: number
}

export type Task = {
  id: number
  comment: Comment
  reclassificationRequest: ReclassificationRequest
  assignee: Pick<AssigneeModel, 'id' | 'firstName' | 'lastName' | 'middleName'>
  workGroup: WorkGroupModel
  createdAt: string
  updatedAt: string
  type: TaskTypeEnum
  businessOperation: string
  contactService: string
  description?: string
  itService: string
  initialImpact?: number | null
  isFailure: boolean
  isMass: boolean
  isOlaBreached: boolean
  olaNextBreachTime?: string | null
  parentExternalId?: string
  parentInteractionExternalId?: string
  parentInteractionPortalExternalId?: string
  parentTaskExternalId?: string
  priorityCode?: number | null
  productClassifier1: string
  productClassifier2: string
  productClassifier3: string
  recordId: string
  isSlaBreached: boolean
  slaNextBreachAt?: string | null
  severity?: number | null
  status: TaskStatusEnum
  supportingService: string
  title: string
  isPendingUpdate?: boolean | null
  resolutionCode?: ResolutionCodeEnum
  techResolution?: string
  userResolution?: string
  isSuspended?: boolean | null
  suspendReason?: SuspendReasonEnum
  suspendUntilTime?: string | null
  address?: string
  city?: string
  country?: string
  name: string
  latitude?: string
  longitude?: string
  state?: string
  zipCode?: string
  parentTask?: number | null
}
