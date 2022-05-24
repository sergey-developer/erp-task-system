import { api } from '/Users/madmaxx/Documents/projects/itsm/src/shared/services/api/index'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    reclassificationRequestsCreate: build.mutation<
      ReclassificationRequestsCreateApiResponse,
      ReclassificationRequestsCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/reclassification-requests`,
        method: 'POST',
        body: queryArg.reclassifiactionRequest,
      }),
    }),
    getTasksList: build.query<GetTasksListApiResponse, GetTasksListApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/tasks/view/`,
        params: {
          date_from: queryArg.dateFrom,
          date_to: queryArg.dateTo,
          filter: queryArg.filter,
          hide_suspended_task: queryArg.hideSuspendedTask,
          limit: queryArg.limit,
          offset: queryArg.offset,
          search_by_assignee: queryArg.searchByAssignee,
          search_by_name: queryArg.searchByName,
          search_by_title: queryArg.searchByTitle,
          sort: queryArg.sort,
          status: queryArg.status,
          task_id: queryArg.taskId,
          work_group_id: queryArg.workGroupId,
        },
      }),
    }),
    getTaskDetail: build.query<GetTaskDetailApiResponse, GetTaskDetailApiArg>({
      query: (queryArg) => ({ url: `/api/v1/tasks/view/${queryArg.id}/` }),
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
export type ReclassificationRequestsCreateApiResponse =
  /** status 201  */ ReclassifiactionRequest
export type ReclassificationRequestsCreateApiArg = {
  reclassifiactionRequest: ReclassifiactionRequest
}
export type GetTasksListApiResponse =
  /** status 200 Список заявок */ PaginatedTaskListItemList
export type GetTasksListApiArg = {
  dateFrom?: string
  dateTo?: string
  filter?: 'ALL' | 'CLOSED' | 'FREE' | 'MINE' | 'OVERDUE'
  hideSuspendedTask?: boolean
  /** Number of results to return per page. */
  limit?: number
  /** The initial index from which to return the results. */
  offset?: number
  searchByAssignee?: string
  searchByName?: string
  searchByTitle?: string
  /** Порядок */
  sort?: (
    | '-created_at'
    | '-ola_next_breach_time'
    | 'created_at'
    | 'ola_next_breach_time'
  )[]
  status?: (
    | 'APPOINTED'
    | 'AWAITING'
    | 'CLOSED'
    | 'COMPLETED'
    | 'IN_PROGRESS'
    | 'IN_RECLASSIFICATION'
    | 'NEW'
    | 'RETURNED'
  )[]
  taskId?: string
  workGroupId?: number
}
export type GetTaskDetailApiResponse = /** status 200  */ TaskDetail
export type GetTaskDetailApiArg = {
  /** A unique integer value identifying this Задача. */
  id: number
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
export type Type9AeEnum =
  | 'COMMON'
  | 'AWAITING'
  | 'RECLASSIFIED'
  | 'COMPLETED'
  | 'SYSTEM'
export type ReclassificationCommentCreate = {
  id: number
  task?: number
  type: Type9AeEnum
  text: string
}
export type ReclassifiactionRequest = {
  id: number
  comment: ReclassificationCommentCreate
  task_id: number
  reclassification_reason: string
}
export type CommentNested = {
  id: number
  created_at: string
  updated_at: string
  type: Type9AeEnum
  text: string
  author: number
  task: number
}
export type ReclassificationReasonEnum =
  | 'WRONG_CLASSIFICATION'
  | 'WRONG_SUPPORT_GROUP'
  | 'DIVIDE_TASK'
export type ReclassificationRequestNestedStatusEnum =
  | 'CREATED'
  | 'APPROVED'
  | 'DENIED'
  | 'IN_PROGRESS'
export type ReclassificationRequestNested = {
  id: number
  created_at: string
  updated_at: string
  external_id?: string
  reclassification_reason: ReclassificationReasonEnum
  external_comment?: string
  status?: ReclassificationRequestNestedStatusEnum
  task: number
}
export type Assignee = {
  id: number
  first_name: string
  last_name: string
  middle_name?: string
}
export type WorkGroup = {
  id: number
  name: string
}
export type Type368Enum =
  | 'INCIDENT'
  | 'REQUEST'
  | 'INCIDENT_TASK'
  | 'REQUEST_TASK'
export type StatusDbcEnum =
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
export type TaskListItem = {
  id: number
  comment: CommentNested
  reclassification_request: ReclassificationRequestNested
  assignee: Assignee
  work_group: WorkGroup
  created_at: string
  updated_at: string
  type: Type368Enum
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
  status: StatusDbcEnum
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
  is_returned?: boolean
  parent_task?: number | null
}
export type PaginatedTaskListItemList = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: TaskListItem[]
}
export type BadRequestResponse = {
  detail: string
}
export type Author = {
  id: number
  first_name: string
  last_name: string
  middle_name?: string
}
export type CommentDetail = {
  id: number
  author: Author
  created_at: string
  updated_at: string
  type: Type9AeEnum
  text: string
  task: number
}
export type RoleEnum =
  | 'ADMIN'
  | 'FIRST_LINE_SUPPORT'
  | 'ENGINEER'
  | 'SENIOR_ENGINEER'
  | 'HEAD_OF_DEPARTMENT'
export type AssigneeAllFields = {
  id: number
  last_login?: string | null
  is_superuser?: boolean
  is_staff?: boolean
  date_joined?: string
  first_name: string
  last_name: string
  middle_name?: string
  role: RoleEnum
  avatar?: string
  phone?: string | null
  email: string
  is_active?: boolean
  is_ready_to_work?: boolean
  groups?: number[]
  user_permissions?: number[]
}
export type File = {
  filename: string
  url: string
}
export type Attachment = {
  id: number
  source: File
  external_id: string
  extension?: string | null
  task: number
}
export type TaskDetail = {
  id: number
  comments: CommentDetail[]
  assignee: AssigneeAllFields
  attachments: Attachment[]
  created_at: string
  updated_at: string
  type: Type368Enum
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
  status: StatusDbcEnum
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
  is_returned?: boolean
  work_group?: number | null
  parent_task?: number | null
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
export type PaginatedWorkGroupList = {
  count?: number
  next?: string | null
  previous?: string | null
  results?: WorkGroup[]
}
export const {
  useReclassificationRequestsCreateMutation,
  useGetTasksListQuery,
  useGetTaskDetailQuery,
  useTestRetrieveQuery,
  useLoginMutation,
  useUserRefreshCreateMutation,
  useGetWorkGroupListQuery,
} = injectedRtkApi
