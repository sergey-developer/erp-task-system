import { WorkGroupModel } from 'modules/workGroups/models'
import { PaginatedListResponse } from 'shared/interfaces/api'
import { AssigneeModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
  ResolutionCodeEnum,
  SmartSortEnum,
  SuspendReasonEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from '../constants'
import { BaseTaskCommentModel } from '../models'
import {
  ExtendedFilterQueries,
  QuickFilterQueries,
  TaskIdFilterQueries,
} from './components/TaskListPage/interfaces'

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
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  smartSort?: SmartSortEnum
  userId?: number
  workGroupId?: number
} & ExtendedFilterQueries &
  QuickFilterQueries &
  TaskIdFilterQueries

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
