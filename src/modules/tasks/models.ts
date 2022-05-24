import { Moment } from 'moment'

import { MaybeNull } from 'shared/interfaces/utils'

export enum FastFilterEnum {
  All = 'ALL',
  Closed = 'CLOSED',
  Free = 'FREE',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
}

export enum TaskStatusEnum {
  Appointed = 'APPOINTED',
  Awaiting = 'AWAITING',
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  InReclassification = 'IN_RECLASSIFICATION',
  New = 'NEW',
  Reclassified = 'RECLASSIFIED',
}

export enum SortEnum {
  ByCreatedDateAsc = 'created_at',
  ByCreatedDateDesc = '-created_at',
  ByOlaAsc = 'ola_next_breach_time',
  ByOlaDesc = '-ola_next_breach_time',
}

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

export type PaginatedTaskList = {
  count: number
  next: string | null
  previous: string | null
  results: Task[]
}

export type ExtendedFilterFormFields = {
  creationDateRange: MaybeNull<[Moment, Moment]>
  searchField: keyof SearchQueries
  searchValue: string
  status: TaskStatusEnum[]
  workGroupId: string
}

export type SearchQueries = {
  searchByAssignee?: string
  searchByName?: string
  searchByTitle?: string
}

export type ExtendedFilterQueries = {
  dateFrom?: string
  dateTo?: string
  status?: TaskStatusEnum[]
  workGroupId?: number
} & SearchQueries

export type QuickFilterQueries = {
  filter?: FastFilterEnum
}

export type TaskIdFilterQueries = {
  taskId?: string
}

export type GetTaskListApiArg = {
  hideAwaitingTask?: boolean
  limit: number
  offset: number
  sort?: SortEnum
  userId?: number
} & ExtendedFilterQueries &
  QuickFilterQueries &
  TaskIdFilterQueries

export enum CommentTypeEnum {
  Common = 'COMMON',
  Awaiting = 'AWAITING',
  Reclassified = 'RECLASSIFIED',
  Completed = 'COMPLETED',
  System = 'SYSTEM',
}

export type Comment = {
  id: number
  created_at: string
  updated_at: string
  type: CommentTypeEnum
  text: string
  author: number
  task: number
}

export enum ReclassificationReasonEnum {
  WrongClassification = 'WRONG_CLASSIFICATION',
  WrongSupport_group = 'WRONG_SUPPORT_GROUP',
  DivideTask = 'DIVIDE_TASK',
}

export enum ReclassificationRequestStatusEnum {
  Approved = 'APPROVED',
  Denied = 'DENIED',
  InProgress = 'IN_PROGRESS',
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
export enum TaskTypeEnum {
  Incident = 'INCIDENT',
  Request = 'REQUEST',
  IncidentTask = 'INCIDENT_TASK',
  RequestTask = 'REQUEST_TASK',
}

export enum ResolutionCodeEnum {
  Success = 'SUCCESS',
  WorkAround = 'WORK_AROUND',
  Canceled = 'CANCELED',
  Dublicate = 'DUBLICATE',
  Reclassified = 'RECLASSIFIED',
  NoResponse = 'NO_RESPONSE',
  NotResolved = 'NOT_RESOLVED',
  TemporaryResolution = 'TEMPORARY_RESOLUTION',
  PermanentResolution = 'PERMANENT_RESOLUTION',
}

export enum SuspendReasonEnum {
  AwaitingReleaseDate = 'AWAITING_RELEASE_DATE',
  ReturnToInitiator = 'RETURN_TO_INITIATOR',
  Guarantee = 'GUARANTEE',
  NoAnswer = 'NO_ANSWER',
  ByInitiatorDemand = 'BY_INITIATOR_DEMAND',
  NoFacilities = 'NO_FACILITIES',
  AwaitingConfimation = 'AWAITING_CONFIMATION',
  TransferToExternal = 'TRANSFER_TO_EXTERNAL',
  AwaitingByInitiatorAgreement = 'AWAITING_BY_INITIATOR_AGREEMENT',
  RequiredApproval = 'REQUIRED_APPROVAL',
  AwaitingStartTime = 'AWAITING_START_TIME',
  AwaitingInitiator = 'AWAITING_INITIATOR',
  AwaitingInformation = 'AWAITING_INFORMATION',
  AwaitingPurchase = 'AWAITING_PURCHASE',
  AwaitingRelease = 'AWAITING_RELEASE',
  AwaitingNonItWork = 'AWAITING_NON_IT_WORK',
  AwaitingInformationFromFirstLine = 'AWAITING_INFORMATION_FROM_FIRST_LINE',
}

export type Task = {
  id: number
  comment: Comment
  reclassificationRequest: ReclassificationRequest
  assignee: Assignee
  workGroup: WorkGroup
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

export type Assignee = {
  id: number
  firstName: string
  lastName: string
  middleName?: string
}

export type WorkGroup = {
  id: number
  name: string
}
