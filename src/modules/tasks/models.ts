import { MaybeNull } from 'shared/interfaces/utils'

export type GetTasksListApiResponse = PaginatedTaskList
export type Filter = 'ALL' | 'FREE' | 'MINE' | 'OVERDUE'

export enum TaskStatusEnum {
  Appointed = 'APPOINTED', // назначенный
  Awaiting = 'AWAITING', // в ожидание
  Closed = 'CLOSED', // закрыт
  Completed = 'COMPLETED', // выполнено
  InProgress = 'IN_PROGRESS', // в работе
  InReclassification = 'IN_RECLASSIFICATION', // На переклассификации
  New = 'NEW', // Ожидает выполнения
  Reclassified = 'RECLASSIFIED', //
}

export type GetTasksListApiArg = MaybeNull<{
  dateFrom?: string
  dateTo?: string
  filter?: Filter
  hideAwaitingTask?: boolean
  limit?: number
  offset?: number
  smartSearchAssignee?: string
  smartSearchDescription?: string
  smartSearchName?: string
  smartSort?:
    | 'BY_CREATED_DATE_ASC'
    | 'BY_CREATED_DATE_DESC'
    | 'BY_OLA_ASC'
    | 'BY_OLA_DESC'
  status?: TaskStatusEnum[]
  taskId?: string
  userId?: number
  workGroupId?: number
}>

export type CommentTypeEnum =
  | 'COMMON'
  | 'AWAITING'
  | 'RECLASSIFIED'
  | 'COMPLETED'
  | 'SYSTEM'
export type Comment = {
  id: number
  created_at: string
  updated_at: string
  type: CommentTypeEnum
  text: string
  author: number
  task: number
}
export type ReclassificationReasonEnum =
  | 'WRONG_CLASSIFICATION'
  | 'WRONG_SUPPORT_GROUP'
  | 'DIVIDE_TASK'
export type ReclassificationRequestStatusEnum =
  | 'APPROVED'
  | 'DENIED'
  | 'IN_PROGRESS'
export type ReclassificationRequest = {
  id: number
  created_at: string
  updated_at: string
  reclassification_reason: ReclassificationReasonEnum
  text_comment: string
  status: ReclassificationRequestStatusEnum
  task: number
}
export type TaskTypeEnum =
  | 'INCIDENT'
  | 'REQUEST'
  | 'INCIDENT_TASK'
  | 'REQUEST_TASK'

export type ResolutionCodeEnum =
  | 'SUCCESS'
  | 'WORK_AROUND'
  | 'CANCELED'
  | 'DUBLICATE'
  | 'RECLASSIFIED'
  | 'NO_RESPONSE'
  | 'NOT_RESOLVED'
  | 'TEMPORARY_RESOLUTION'
  | 'PERMANENT_RESOLUTION'
export type SuspendReasonEnum =
  | 'AWAITING_RELEASE_DATE'
  | 'RETURN_TO_INITIATOR'
  | 'GUARANTEE'
  | 'NO_ANSWER'
  | 'BY_INITIATOR_DEMAND'
  | 'NO_FACILITIES'
  | 'AWAITING_CONFIMATION'
  | 'TRANSFER_TO_EXTERNAL'
  | 'AWAITING_BY_INITIATOR_AGREEMENT'
  | 'REQUIRED_APPROVAL'
  | 'AWAITING_START_TIME'
  | 'AWAITING_INITIATOR'
  | 'AWAITING_INFORMATION'
  | 'AWAITING_PURCHASE'
  | 'AWAITING_RELEASE'
  | 'AWAITING_NON_IT_WORK'
  | 'AWAITING_INFORMATION_FROM_FIRST_LINE'

export type Task = {
  id: number
  comment: Comment
  reclassificationRequest: ReclassificationRequest
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
  assignee?: number | null
  workGroup?: number | null
  parentTask?: number | null
}
export type PaginatedTaskList = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Task[]
}
