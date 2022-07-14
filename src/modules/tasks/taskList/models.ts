import { WorkGroupModel } from 'modules/workGroups/models'
import { AssigneeModel } from 'shared/interfaces/models'
import { PaginatedListResponseModel } from 'shared/interfaces/models'
import { MaybeNull } from 'shared/interfaces/utils'

import {
  ReclassificationReasonEnum,
  ReclassificationRequestStatusEnum,
  ResolutionCodeEnum,
  SortEnum,
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

export type GetTaskListResponseModel =
  PaginatedListResponseModel<TaskListItemModel>

export type GetTaskListQueryArgsModel = {
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  sort?: SortEnum
  userId?: number
} & ExtendedFilterQueries &
  QuickFilterQueries &
  TaskIdFilterQueries

export type TaskListItemCommentModel = BaseTaskCommentModel & {
  task: number
  author: number
  updatedAt: string
}

export type TaskReclassificationRequestModel = {
  id: number
  createdAt: string
  updatedAt: string
  reclassificationReason: ReclassificationReasonEnum
  textComment: string
  status: ReclassificationRequestStatusEnum
  task: number
}

export type TaskListItemModel = {
  id: number
  comment: TaskListItemCommentModel
  reclassificationRequest: TaskReclassificationRequestModel
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
