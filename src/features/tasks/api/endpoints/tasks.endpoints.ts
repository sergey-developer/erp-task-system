import {
  TaskExtendedStatusEnum,
  TasksApiPathsEnum,
  TasksEndpointsNamesEnum,
  TasksEndpointsTagsEnum,
} from 'features/tasks/api/constants'
import {
  makeClassifyTaskWorkTypeApiPath,
  makeCreateSubTaskApiPath,
  makeCreateTaskAttachmentApiPath,
  makeCreateTaskCommentApiPath,
  makeCreateTaskCompletedWorkApiPath,
  makeCreateTaskCompletionDocumentsApiPath,
  makeCreateTaskInitiationReasonApiPath,
  makeCreateTaskReclassificationRequestApiPath,
  makeCreateTaskRegistrationFNRequestApiPath,
  makeCreateTaskSuspendRequestApiPath,
  makeDeleteTaskCompletedWorkApiPath,
  makeDeleteTaskInitiationReasonApiPath,
  makeDeleteTaskSuspendRequestApiPath,
  makeDeleteTaskWorkGroupApiPath,
  makeGetSubTasksApiPath,
  makeGetTaskApiPath,
  makeGetTaskCommentListApiPath,
  makeGetTaskCompletionDocumentsApiPath,
  makeGetTaskJournalApiPath,
  makeGetTaskJournalCsvApiPath,
  makeGetTaskReclassificationRequestApiPath,
  makeGetTaskRegistrationRequestRecipientsFNApiPath,
  makeGetTaskWorkPerformedActApiPath,
  makeResolveTaskApiPath,
  makeTakeTaskApiPath,
  makeUpdateTaskAssigneeApiPath,
  makeUpdateTaskDeadlineApiPath,
  makeUpdateTaskDescriptionApiPath,
  makeUpdateTaskWorkGroupApiPath,
} from 'features/tasks/api/helpers'
import {
  ClassifyTaskWorkTypeRequest,
  ClassifyTaskWorkTypeResponse,
  CreateSubTaskRequest,
  CreateSubTaskResponse,
  CreateTaskAttachmentRequest,
  CreateTaskAttachmentResponse,
  CreateTaskCommentRequest,
  CreateTaskCommentResponse,
  CreateTaskCompletedWorkRequest,
  CreateTaskCompletedWorkResponse,
  CreateTaskCompletionDocumentsRequest,
  CreateTaskCompletionDocumentsResponse,
  CreateTaskInitiationReasonRequest,
  CreateTaskInitiationReasonResponse,
  CreateTaskReclassificationRequestRequest,
  CreateTaskReclassificationRequestResponse,
  CreateTaskRegistrationFNRequestRequest,
  CreateTaskRegistrationFNRequestResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  CreateTaskSuspendRequestRequest,
  CreateTaskSuspendRequestResponse,
  DeleteTaskCompletedWorkRequest,
  DeleteTaskCompletedWorkResponse,
  DeleteTaskInitiationReasonRequest,
  DeleteTaskInitiationReasonResponse,
  DeleteTaskSuspendRequestRequest,
  DeleteTaskSuspendRequestResponse,
  DeleteTaskWorkGroupRequest,
  DeleteTaskWorkGroupResponse,
  GetSubTasksRequest,
  GetSubTasksResponse,
  GetTaskCommentsRequest,
  GetTaskCommentsResponse,
  GetTaskCompletionDocumentsRequest,
  GetTaskCompletionDocumentsResponse,
  GetTaskCountersRequest,
  GetTaskCountersResponse,
  GetTaskJournalCsvRequest,
  GetTaskJournalCsvResponse,
  GetTaskJournalRequest,
  GetTaskJournalResponse,
  GetTaskReclassificationRequestRequest,
  GetTaskReclassificationRequestResponse,
  GetTaskRegistrationRequestRecipientsFNRequest,
  GetTaskRegistrationRequestRecipientsFNResponse,
  GetTaskRequest,
  GetTaskResponse,
  GetTasksMapRequest,
  GetTasksMapResponse,
  GetTasksRequest,
  GetTasksResponse,
  GetTaskWorkPerformedActRequest,
  GetTaskWorkPerformedActResponse,
  ResolveTaskRequest,
  ResolveTaskResponse,
  TakeTaskRequest,
  TakeTaskResponse,
  UpdateTaskAssigneeRequest,
  UpdateTaskAssigneeResponse,
  UpdateTaskDeadlineRequest,
  UpdateTaskDeadlineResponse,
  UpdateTaskDescriptionRequest,
  UpdateTaskDescriptionResponse,
  UpdateTaskWorkGroupRequest,
  UpdateTaskWorkGroupResponse,
} from 'features/tasks/api/schemas'
import { UsersEndpointsTagsEnum } from 'features/users/api/constants'
import { decamelize } from 'humps'
import isBoolean from 'lodash/isBoolean'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi, ErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

import { SubTaskDTO } from '../dto'
import { GetTasksTransformedResponse } from '../types'

const tasksEndpoints = baseApi
  .enhanceEndpoints({ addTagTypes: [TasksEndpointsTagsEnum.TaskCounters] })
  .injectEndpoints({
    endpoints: (build) => ({
      [TasksEndpointsNamesEnum.GetTasks]: build.query<GetTasksTransformedResponse, GetTasksRequest>(
        {
          providesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Tasks]),
          query: (params) => ({
            url: TasksApiPathsEnum.GetTasks,
            method: HttpMethodEnum.Get,
            params,
          }),
          transformResponse: (response: GetTasksResponse, meta, arg) =>
            getPaginatedList(response, arg),
        },
      ),
      [TasksEndpointsNamesEnum.GetTasksMap]: build.query<GetTasksMapResponse, GetTasksMapRequest>({
        query: () => ({
          url: TasksApiPathsEnum.GetTasksMap,
          method: HttpMethodEnum.Get,
        }),
      }),

      [TasksEndpointsNamesEnum.GetTaskCounters]: build.query<
        GetTaskCountersResponse,
        MaybeUndefined<GetTaskCountersRequest>
      >({
        providesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.TaskCounters]),
        query: (params) => ({
          url: TasksApiPathsEnum.GetTaskCounters,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      [TasksEndpointsNamesEnum.GetTask]: build.query<GetTaskResponse, GetTaskRequest>({
        providesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Task]),
        query: (taskId) => ({
          url: makeGetTaskApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createTask: build.mutation<CreateTaskResponse, CreateTaskRequest>({
        invalidatesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Tasks]),
        query: ({
          type,
          olaNextBreachTime,
          title,
          description,
          workGroup,
          assignee,
          isPrivate,
          attachments,
          coExecutors,
          observers,
          workType,
          customer,
          contactType,
          email,
          shopId,
          address,
          parentTask,
        }) => {
          const formData = new FormData()

          formData.append(decamelize('olaNextBreachTime'), olaNextBreachTime)
          formData.append('title', title)
          formData.append('description', description)

          if (type) formData.append('type', type)
          if (parentTask) formData.append(decamelize('parentTask'), String(parentTask))
          if (workGroup) formData.append(decamelize('workGroup'), String(workGroup))
          if (assignee) formData.append('assignee', String(assignee))
          if (isBoolean(isPrivate)) formData.append(decamelize('isPrivate'), String(isPrivate))
          if (attachments?.length) attachments.forEach((att) => formData.append('attachments', att))

          if (coExecutors?.length) {
            coExecutors.forEach((executor) =>
              formData.append(decamelize('coExecutors'), String(executor)),
            )
          }

          if (observers?.length) {
            observers.forEach((observer) => formData.append('observers', String(observer)))
          }

          if (workType) formData.append(decamelize('workType'), String(workType))
          if (customer) formData.append('customer', String(customer))
          if (contactType) formData.append(decamelize('contactType'), contactType)
          if (email) formData.append('email', email)
          if (shopId) formData.append(decamelize('shopId'), String(shopId))
          if (address) formData.append('address', address)

          return {
            url: TasksApiPathsEnum.CreateTask,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      [TasksEndpointsNamesEnum.GetWorkPerformedAct]: build.mutation<
        GetTaskWorkPerformedActResponse,
        GetTaskWorkPerformedActRequest
      >({
        query: ({ taskId, ...payload }) => ({
          url: makeGetTaskWorkPerformedActApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      [TasksEndpointsNamesEnum.ResolveTask]: build.mutation<
        ResolveTaskResponse,
        ResolveTaskRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [TasksEndpointsTagsEnum.Tasks, TasksEndpointsTagsEnum.TaskCounters],
        query: ({
          taskId,
          techResolution,
          userResolution,
          spentHours,
          spentMinutes,
          resolutionClassifier1,
          attachments,
        }) => {
          const formData = new FormData()

          formData.append(decamelize('techResolution'), techResolution)
          formData.append(decamelize('spentHours'), String(spentHours))
          formData.append(decamelize('spentMinutes'), String(spentMinutes))
          if (userResolution) formData.append(decamelize('userResolution'), userResolution)
          if (resolutionClassifier1)
            formData.append(decamelize('resolutionClassifier1'), String(resolutionClassifier1))

          if (attachments?.length) {
            attachments.forEach((att) => formData.append('attachments', att))
          }

          return {
            url: makeResolveTaskApiPath(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      [TasksEndpointsNamesEnum.TakeTask]: build.mutation<TakeTaskResponse, TakeTaskRequest>({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                TasksEndpointsTagsEnum.Task,
                TasksEndpointsTagsEnum.TaskCounters,
                UsersEndpointsTagsEnum.UserActions,
              ],
        query: ({ taskId }) => ({
          url: makeTakeTaskApiPath(taskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      [TasksEndpointsNamesEnum.CreateTaskComment]: build.mutation<
        CreateTaskCommentResponse,
        CreateTaskCommentRequest
      >({
        query: ({ taskId, comment, attachments }) => {
          const formData = new FormData()
          formData.append('comment', comment)

          if (attachments?.length) {
            attachments.forEach((att) => {
              formData.append('attachments', att)
            })
          }

          return {
            url: makeCreateTaskCommentApiPath(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: newComment } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                TasksEndpointsNamesEnum.GetTaskCommentList as never,
                { taskId } as never,
                (commentList: GetTaskCommentsResponse) => {
                  commentList.unshift(newComment)
                },
              ),
            )
          } catch {}
        },
      }),
      [TasksEndpointsNamesEnum.GetTaskCommentList]: build.query<
        GetTaskCommentsResponse,
        GetTaskCommentsRequest
      >({
        query: ({ taskId }) => ({
          url: makeGetTaskCommentListApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      updateTaskDescription: build.mutation<
        UpdateTaskDescriptionResponse,
        UpdateTaskDescriptionRequest
      >({
        invalidatesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Task]),
        query: ({ taskId, ...payload }) => ({
          url: makeUpdateTaskDescriptionApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      updateTaskDeadline: build.mutation<UpdateTaskDeadlineResponse, UpdateTaskDeadlineRequest>({
        invalidatesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Task]),
        query: ({ taskId, ...payload }) => ({
          url: makeUpdateTaskDeadlineApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      updateTaskAssignee: build.mutation<UpdateTaskAssigneeResponse, UpdateTaskAssigneeRequest>({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                TasksEndpointsTagsEnum.Task,
                TasksEndpointsTagsEnum.TaskCounters,
                UsersEndpointsTagsEnum.UserActions,
              ],
        query: ({ taskId, ...data }) => ({
          url: makeUpdateTaskAssigneeApiPath(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),

      getTaskCompletionDocuments: build.query<
        GetTaskCompletionDocumentsResponse,
        GetTaskCompletionDocumentsRequest
      >({
        query: ({ taskId }) => ({
          url: makeGetTaskCompletionDocumentsApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createTaskCompletionDocuments: build.mutation<
        CreateTaskCompletionDocumentsResponse,
        CreateTaskCompletionDocumentsRequest
      >({
        query: ({ taskId }) => ({
          url: makeCreateTaskCompletionDocumentsApiPath(taskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      createTaskInitiationReason: build.mutation<
        CreateTaskInitiationReasonResponse,
        CreateTaskInitiationReasonRequest
      >({
        query: ({ taskId, ...data }) => ({
          url: makeCreateTaskInitiationReasonApiPath(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (docs: GetTaskCompletionDocumentsResponse) => {
                  Array.isArray(docs.initiationReasons)
                    ? docs.initiationReasons.push(data)
                    : (docs.initiationReasons = [data])
                },
              ),
            )
          } catch {}
        },
      }),
      deleteTaskInitiationReason: build.mutation<
        DeleteTaskInitiationReasonResponse,
        DeleteTaskInitiationReasonRequest
      >({
        query: ({ id }) => ({
          url: makeDeleteTaskInitiationReasonApiPath(id),
          method: HttpMethodEnum.Delete,
        }),
        onQueryStarted: async ({ id, taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (data: GetTaskCompletionDocumentsResponse) => {
                  if (data.initiationReasons?.length) {
                    data.initiationReasons = data.initiationReasons.filter((r) => r.id !== id)
                  }
                },
              ),
            )
          } catch {}
        },
      }),

      createTaskCompletedWork: build.mutation<
        CreateTaskCompletedWorkResponse,
        CreateTaskCompletedWorkRequest
      >({
        query: ({ taskId, ...data }) => ({
          url: makeCreateTaskCompletedWorkApiPath(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (docs: GetTaskCompletionDocumentsResponse) => {
                  Array.isArray(docs.workList) ? docs.workList.push(data) : (docs.workList = [data])
                },
              ),
            )
          } catch {}
        },
      }),
      deleteTaskCompletedWork: build.mutation<
        DeleteTaskCompletedWorkResponse,
        DeleteTaskCompletedWorkRequest
      >({
        query: ({ id }) => ({
          url: makeDeleteTaskCompletedWorkApiPath(id),
          method: HttpMethodEnum.Delete,
        }),
        onQueryStarted: async ({ id, taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (data: GetTaskCompletionDocumentsResponse) => {
                  if (data.workList?.length) {
                    data.workList = data.workList.filter((r) => r.id !== id)
                  }
                },
              ),
            )
          } catch {}
        },
      }),

      getTaskJournal: build.query<GetTaskJournalResponse, GetTaskJournalRequest>({
        query: ({ taskId, ...params }) => ({
          url: makeGetTaskJournalApiPath(taskId),
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      getTaskJournalCsv: build.query<GetTaskJournalCsvResponse, GetTaskJournalCsvRequest>({
        query: ({ taskId }) => ({
          url: makeGetTaskJournalCsvApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createTaskReclassificationRequest: build.mutation<
        CreateTaskReclassificationRequestResponse,
        CreateTaskReclassificationRequestRequest
      >({
        query: ({ taskId, ...payload }) => ({
          url: makeCreateTaskReclassificationRequestApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                TasksEndpointsNamesEnum.GetTask as never,
                taskId as never,
                (task: GetTaskResponse) => {
                  task.extendedStatus = TaskExtendedStatusEnum.InReclassification
                },
              ),
            )
          } catch {}
        },
      }),
      getTaskReclassificationRequest: build.query<
        GetTaskReclassificationRequestResponse,
        GetTaskReclassificationRequestRequest
      >({
        query: ({ taskId }) => ({
          url: makeGetTaskReclassificationRequestApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createTaskSuspendRequest: build.mutation<
        CreateTaskSuspendRequestResponse,
        CreateTaskSuspendRequestRequest
      >({
        query: ({ taskId, ...payload }) => ({
          url: makeCreateTaskSuspendRequestApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: suspendRequest } = await queryFulfilled

            dispatch(
              tasksEndpoints.util.updateQueryData(
                TasksEndpointsNamesEnum.GetTask as never,
                taskId as never,
                (task: GetTaskResponse) => {
                  task.suspendRequest = suspendRequest
                },
              ),
            )
          } catch {}
        },
      }),
      deleteTaskSuspendRequest: build.mutation<
        DeleteTaskSuspendRequestResponse,
        DeleteTaskSuspendRequestRequest
      >({
        invalidatesTags: (result, error) =>
          error
            ? isNotFoundError(error as ErrorResponse)
              ? [TasksEndpointsTagsEnum.Task]
              : []
            : [TasksEndpointsTagsEnum.Task],
        query: ({ taskId }) => ({
          url: makeDeleteTaskSuspendRequestApiPath(taskId),
          method: HttpMethodEnum.Delete,
        }),
      }),

      updateTaskWorkGroup: build.mutation<UpdateTaskWorkGroupResponse, UpdateTaskWorkGroupRequest>({
        invalidatesTags: (result, error) =>
          error ? [] : [TasksEndpointsTagsEnum.Tasks, TasksEndpointsTagsEnum.TaskCounters],
        query: ({ taskId, ...payload }) => ({
          url: makeUpdateTaskWorkGroupApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      deleteTaskWorkGroup: build.mutation<DeleteTaskWorkGroupResponse, DeleteTaskWorkGroupRequest>({
        invalidatesTags: (result, error) =>
          error ? [] : [TasksEndpointsTagsEnum.Tasks, TasksEndpointsTagsEnum.TaskCounters],
        query: ({ taskId, ...payload }) => ({
          url: makeDeleteTaskWorkGroupApiPath(taskId),
          method: HttpMethodEnum.Delete,
          data: payload,
        }),
      }),

      createTaskAttachment: build.mutation<
        CreateTaskAttachmentResponse,
        CreateTaskAttachmentRequest
      >({
        query: ({ taskId, file, parentType }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append(decamelize('parentType'), parentType)

          return {
            url: makeCreateTaskAttachmentApiPath(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      createTaskRegistrationFNRequest: build.mutation<
        CreateTaskRegistrationFNRequestResponse,
        CreateTaskRegistrationFNRequestRequest
      >({
        invalidatesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Task]),
        query: ({ taskId, ...data }) => ({
          url: makeCreateTaskRegistrationFNRequestApiPath(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      getTaskRegistrationRequestRecipientsFN: build.query<
        GetTaskRegistrationRequestRecipientsFNResponse,
        GetTaskRegistrationRequestRecipientsFNRequest
      >({
        query: ({ taskId }) => ({
          url: makeGetTaskRegistrationRequestRecipientsFNApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      [TasksEndpointsNamesEnum.GetSubTasks]: build.query<GetSubTasksResponse, GetSubTasksRequest>({
        query: ({ taskId }) => ({
          url: makeGetSubTasksApiPath(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      [TasksEndpointsNamesEnum.CreateSubTask]: build.mutation<
        CreateSubTaskResponse,
        CreateSubTaskRequest
      >({
        query: ({ taskId, ...payload }) => ({
          url: makeCreateSubTaskApiPath(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: newSubTask } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                TasksEndpointsNamesEnum.GetSubTasks as never,
                { taskId } as never,
                (subTaskList: SubTaskDTO[]) => {
                  subTaskList.unshift(newSubTask)
                },
              ),
            )
          } catch {}
        },
      }),

      classifyTaskWorkType: build.mutation<
        ClassifyTaskWorkTypeResponse,
        ClassifyTaskWorkTypeRequest
      >({
        invalidatesTags: (result, error) => (error ? [] : [TasksEndpointsTagsEnum.Task]),
        query: ({ taskId, ...data }) => ({
          url: makeClassifyTaskWorkTypeApiPath({ taskId }),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
    }),
  })

export const {
  useGetTaskQuery,
  useCreateTaskMutation,

  useGetTaskCountersQuery,

  useGetTasksQuery,
  useGetTasksMapQuery,

  useGetTaskWorkPerformedActMutation,

  useGetTaskCompletionDocumentsQuery,
  useCreateTaskCompletionDocumentsMutation,
  useCreateTaskInitiationReasonMutation,
  useDeleteTaskInitiationReasonMutation,
  useCreateTaskCompletedWorkMutation,
  useDeleteTaskCompletedWorkMutation,

  useResolveTaskMutation,
  useTakeTaskMutation,
  useUpdateTaskDescriptionMutation,
  useUpdateTaskDeadlineMutation,

  useGetTaskCommentsQuery,
  useCreateTaskCommentMutation,

  useUpdateTaskAssigneeMutation,

  useGetTaskJournalQuery,
  useLazyGetTaskJournalCsvQuery,

  useCreateTaskReclassificationRequestMutation,
  useGetTaskReclassificationRequestQuery,

  useCreateTaskSuspendRequestMutation,
  useDeleteTaskSuspendRequestMutation,

  useUpdateTaskWorkGroupMutation,
  useDeleteTaskWorkGroupMutation,

  useCreateSubTaskMutation,
  useGetSubTasksQuery,

  useCreateTaskRegistrationFNRequestMutation,
  useGetTaskRegistrationRequestRecipientsFNQuery,

  useCreateTaskAttachmentMutation,

  useClassifyTaskWorkTypeMutation,
} = tasksEndpoints

export default tasksEndpoints
