import { api } from '/Users/madmaxx/Documents/projects/itsm/src/shared/services/api/index'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasksList: build.query<GetTasksListApiResponse, GetTasksListApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/tasks/view/`,
        params: {
          date_from: queryArg.dateFrom,
          date_to: queryArg.dateTo,
          filter: queryArg.filter,
          hide_awaiting_task: queryArg.hideAwaitingTask,
          limit: queryArg.limit,
          offset: queryArg.offset,
          smart_search_assignee: queryArg.smartSearchAssignee,
          smart_search_description: queryArg.smartSearchDescription,
          smart_search_name: queryArg.smartSearchName,
          smart_sort: queryArg.smartSort,
          status: queryArg.status,
          task_id: queryArg.taskId,
          user_id: queryArg.userId,
          work_group_id: queryArg.workGroupId,
        },
      }),
    }),
    testRetrieve: build.query<TestRetrieveApiResponse, TestRetrieveApiArg>({
      query: () => ({ url: `/api/v1/test/` }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/user/auth`,
        method: 'POST',
        body: queryArg.tokenObtainWithRoleRequest,
      }),
    }),
    userRefreshCreate: build.mutation<
      UserRefreshCreateApiResponse,
      UserRefreshCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/refresh`,
        method: 'POST',
        body: queryArg.tokenRefresh,
      }),
    }),
    getWorkGroupList: build.query<
      GetWorkGroupListApiResponse,
      GetWorkGroupListApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-groups/`,
        params: { limit: queryArg.limit, offset: queryArg.offset },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetTasksListApiResponse =
  /** status 200 Список заявок */ PaginatedTaskList
export type GetTasksListApiArg = {
  dateFrom?: string
  dateTo?: string
  filter?: 'ALL' | 'FREE' | 'MINE' | 'OVERDUE'
  hideAwaitingTask?: boolean
  /** Number of results to return per page. */
  limit?: number
  /** The initial index from which to return the results. */
  offset?: number
  smartSearchAssignee?: string
  smartSearchDescription?: string
  smartSearchName?: string
  smartSort?:
    | 'BY_CREATED_DATE_ASC'
    | 'BY_CREATED_DATE_DESC'
    | 'BY_OLA_ASC'
    | 'BY_OLA_DESC'
  status?: (
    | 'APPOINTED'
    | 'AWAITING'
    | 'CLOSED'
    | 'COMPLETED'
    | 'IN_PROGRESS'
    | 'IN_RECLASSIFICATION'
    | 'NEW'
    | 'RECLASSIFIED'
  )[]
  taskId?: string
  userId?: number
  workGroupId?: number
}
export type TestRetrieveApiResponse = unknown
export type TestRetrieveApiArg = void
export type LoginApiResponse = /** status 200  */ TokenObtainWithRoleResponse
export type LoginApiArg = {
  tokenObtainWithRoleRequest: TokenObtainWithRoleRequest
}
export type UserRefreshCreateApiResponse = /** status 200  */ TokenRefresh
export type UserRefreshCreateApiArg = {
  tokenRefresh: TokenRefresh
}
export type GetWorkGroupListApiResponse =
  /** status 200  */ PaginatedWorkGroupList
export type GetWorkGroupListApiArg = {
  /** Number of results to return per page. */
  limit?: number
  /** The initial index from which to return the results. */
  offset?: number
}
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
export type TaskStatusEnum =
  | 'NEW'
  | 'APPOINTED'
  | 'RECLASSIFIED'
  | 'IN_PROGRESS'
  | 'AWAITING'
  | 'COMPLETED'
  | 'CLOSED'
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
  reclassification_request: ReclassificationRequest
  created_at: string
  updated_at: string
  type: TaskTypeEnum
  business_operation: string
  contact_service: string
  description?: string
  it_service: string
  initial_impact?: number | null
  is_failure: boolean
  is_mass: boolean
  is_ola_breached: boolean
  ola_next_breach_time?: string | null
  parent_external_id?: string
  parent_interaction_external_id?: string
  parent_interaction_portal_external_id?: string
  parent_task_external_id?: string
  priority_code?: number | null
  product_classifier1: string
  product_classifier2: string
  product_classifier3: string
  record_id: string
  is_sla_breached: boolean
  sla_next_breach_at?: string | null
  severity?: number | null
  status: TaskStatusEnum
  supporting_service: string
  title: string
  is_pending_update?: boolean | null
  resolution_code?: ResolutionCodeEnum
  tech_resolution?: string
  user_resolution?: string
  is_suspended?: boolean | null
  suspend_reason?: SuspendReasonEnum
  suspend_until_time?: string | null
  address?: string
  city?: string
  country?: string
  name: string
  latitude?: string
  longitude?: string
  state?: string
  zip_code?: string
  assignee?: number | null
  work_group?: number | null
  parent_task?: number | null
}
export type PaginatedTaskList = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: Task[]
}
export type BadRequestResponse = {
  detail: string
}
export type TokenObtainWithRoleResponse = {
  access: string
  refresh: string
}
export type TokenObtainWithRoleRequest = {
  email: string
  password: string
}
export type TokenRefresh = {
  access: string
  refresh: string
}
export type WorkGroupUserIntroduction = {
  id: number
  full_name: string
}
export type WorkGroup = {
  id: number
  name: string
  senior_engineer: WorkGroupUserIntroduction
  group_lead: WorkGroupUserIntroduction
  members: WorkGroupUserIntroduction[]
}
export type PaginatedWorkGroupList = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: WorkGroup[]
}
export const {
  useGetTasksListQuery,
  useTestRetrieveQuery,
  useLoginMutation,
  useUserRefreshCreateMutation,
  useGetWorkGroupListQuery,
} = injectedRtkApi
