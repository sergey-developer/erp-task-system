import {
  TaskApiEnum,
  TaskApiTagEnum,
  TaskApiTriggerEnum,
  TaskExtendedStatusEnum,
} from 'features/task/constants/task'
import {
  ClassifyTaskWorkTypeMutationArgs,
  ClassifyTaskWorkTypeSuccessResponse,
  CreateInitiationReasonMutationArgs,
  CreateInitiationReasonSuccessResponse,
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse,
  CreateTaskAttachmentMutationArgs,
  CreateTaskAttachmentSuccessResponse,
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
  CreateTaskCompletedWorkMutationArgs,
  CreateTaskCompletedWorkSuccessResponse,
  CreateTaskCompletionDocumentsMutationArgs,
  CreateTaskCompletionDocumentsSuccessResponse,
  CreateTaskMutationArgs,
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
  CreateTaskRegistrationFNRequestMutationArgs,
  CreateTaskRegistrationFNRequestSuccessResponse,
  CreateTaskSuccessResponse,
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse,
  DeleteCompletedWorkMutationArgs,
  DeleteCompletedWorkSuccessResponse,
  DeleteInitiationReasonMutationArgs,
  DeleteInitiationReasonSuccessResponse,
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestSuccessResponse,
  DeleteTaskWorkGroupMutationArgs,
  DeleteTaskWorkGroupSuccessResponse,
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse,
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse,
  GetTaskCompletionDocumentsQueryArgs,
  GetTaskCompletionDocumentsSuccessResponse,
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse,
  GetTaskJournalCsvQueryArgs,
  GetTaskJournalCsvSuccessResponse,
  GetTaskJournalQueryArgs,
  GetTaskJournalSuccessResponse,
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse,
  GetTaskQueryArgs,
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse,
  GetTasksQueryArgs,
  GetTasksSuccessResponse,
  GetTaskSuccessResponse,
  GetTaskWorkPerformedActMutationArgs,
  GetTaskWorkPerformedActSuccessResponse,
  ResolveTaskMutationArgs,
  ResolveTaskSuccessResponse,
  SubTaskModel,
  TakeTaskMutationArgs,
  TakeTaskSuccessResponse,
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
  UpdateTaskDeadlineMutationArgs,
  UpdateTaskDeadlineSuccessResponse,
  UpdateTaskDescriptionMutationArgs,
  UpdateTaskDescriptionSuccessResponse,
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'features/task/models'
import { GetTasksTransformedSuccessResponse } from 'features/task/types'
import {
  createCompletedWorkUrl,
  createInitiationReasonUrl,
  createSubTaskUrl,
  createTaskAttachmentUrl,
  createTaskCompletionDocumentsUrl,
  createTaskRegistrationFNRequestUrl,
  deleteCompletedWorkUrl,
  deleteInitiationReasonUrl,
  getSubTaskListUrl,
  getTaskCompletionDocumentsUrl,
  getTaskRegistrationRequestRecipientsFNUrl,
  getTaskUrl,
  getTaskWorkPerformedActUrl,
  makeClassifyTaskWorkTypeUrl,
  resolveTaskUrl,
  takeTaskUrl,
  updateTaskDeadlineUrl,
  updateTaskDescriptionUrl,
} from 'features/task/utils/task'
import { updateTaskAssigneeUrl } from 'features/task/utils/taskAssignee'
import { createTaskCommentUrl, getTaskCommentListUrl } from 'features/task/utils/taskComment'
import { getTaskJournalCsvUrl, getTaskJournalUrl } from 'features/task/utils/taskJournal'
import {
  createTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
} from 'features/task/utils/taskReclassificationRequest'
import {
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
} from 'features/task/utils/taskSuspendRequest'
import { deleteTaskWorkGroupUrl, updateTaskWorkGroupUrl } from 'features/task/utils/taskWorkGroup'
import { UsersEndpointsTagsEnum } from 'features/users/api/constants'
import { decamelize } from 'humps'
import isBoolean from 'lodash/isBoolean'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi, ErrorResponse, isNotFoundError } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/types/utils'

const taskApiService = baseApi
  .enhanceEndpoints({ addTagTypes: [TaskApiTagEnum.TaskCounters] })
  .injectEndpoints({
    endpoints: (build) => ({
      [TaskApiTriggerEnum.GetTasks]: build.query<
        GetTasksTransformedSuccessResponse,
        GetTasksQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Tasks]),
        query: (params) => ({
          url: TaskApiEnum.GetTasks,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetTasksSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),
      [TaskApiTriggerEnum.GetTaskListMap]: build.query<
        GetTaskListMapSuccessResponse,
        GetTaskListMapQueryArgs
      >({
        query: () => ({
          url: TaskApiEnum.GetTaskListMap,
          method: HttpMethodEnum.Get,
        }),
      }),

      [TaskApiTriggerEnum.GetTaskCounters]: build.query<
        GetTaskCountersSuccessResponse,
        MaybeUndefined<GetTaskCountersQueryArgs>
      >({
        providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskCounters]),
        query: (params) => ({
          url: TaskApiEnum.GetTaskCounters,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      [TaskApiTriggerEnum.GetTask]: build.query<GetTaskSuccessResponse, GetTaskQueryArgs>({
        providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
        query: (taskId) => ({
          url: getTaskUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createTask: build.mutation<CreateTaskSuccessResponse, CreateTaskMutationArgs>({
        invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Tasks]),
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
            url: TaskApiEnum.CreateTask,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      [TaskApiTriggerEnum.GetWorkPerformedAct]: build.mutation<
        GetTaskWorkPerformedActSuccessResponse,
        GetTaskWorkPerformedActMutationArgs
      >({
        query: ({ taskId, ...payload }) => ({
          url: getTaskWorkPerformedActUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      [TaskApiTriggerEnum.ResolveTask]: build.mutation<
        ResolveTaskSuccessResponse,
        ResolveTaskMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [TaskApiTagEnum.Tasks, TaskApiTagEnum.TaskCounters],
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
            url: resolveTaskUrl(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      [TaskApiTriggerEnum.TakeTask]: build.mutation<TakeTaskSuccessResponse, TakeTaskMutationArgs>({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                TaskApiTagEnum.Task,
                TaskApiTagEnum.TaskCounters,
                UsersEndpointsTagsEnum.UserActions,
              ],
        query: ({ taskId }) => ({
          url: takeTaskUrl(taskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      [TaskApiTriggerEnum.CreateTaskComment]: build.mutation<
        CreateTaskCommentSuccessResponse,
        CreateTaskCommentMutationArgs
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
            url: createTaskCommentUrl(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: newComment } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                TaskApiTriggerEnum.GetTaskCommentList as never,
                { taskId } as never,
                (commentList: GetTaskCommentListSuccessResponse) => {
                  commentList.unshift(newComment)
                },
              ),
            )
          } catch {}
        },
      }),
      [TaskApiTriggerEnum.GetTaskCommentList]: build.query<
        GetTaskCommentListSuccessResponse,
        GetTaskCommentListQueryArgs
      >({
        query: ({ taskId }) => ({
          url: getTaskCommentListUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      updateTaskDescription: build.mutation<
        UpdateTaskDescriptionSuccessResponse,
        UpdateTaskDescriptionMutationArgs
      >({
        invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
        query: ({ taskId, ...payload }) => ({
          url: updateTaskDescriptionUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      updateTaskDeadline: build.mutation<
        UpdateTaskDeadlineSuccessResponse,
        UpdateTaskDeadlineMutationArgs
      >({
        invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
        query: ({ taskId, ...payload }) => ({
          url: updateTaskDeadlineUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),

      updateTaskAssignee: build.mutation<
        UpdateTaskAssigneeSuccessResponse,
        UpdateTaskAssigneeMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                TaskApiTagEnum.Task,
                TaskApiTagEnum.TaskCounters,
                UsersEndpointsTagsEnum.UserActions,
              ],
        query: ({ taskId, ...data }) => ({
          url: updateTaskAssigneeUrl(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),

      getTaskCompletionDocuments: build.query<
        GetTaskCompletionDocumentsSuccessResponse,
        GetTaskCompletionDocumentsQueryArgs
      >({
        query: ({ taskId }) => ({
          url: getTaskCompletionDocumentsUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createTaskCompletionDocuments: build.mutation<
        CreateTaskCompletionDocumentsSuccessResponse,
        CreateTaskCompletionDocumentsMutationArgs
      >({
        query: ({ taskId }) => ({
          url: createTaskCompletionDocumentsUrl(taskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      createInitiationReason: build.mutation<
        CreateInitiationReasonSuccessResponse,
        CreateInitiationReasonMutationArgs
      >({
        query: ({ taskId, ...data }) => ({
          url: createInitiationReasonUrl(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (docs: GetTaskCompletionDocumentsSuccessResponse) => {
                  Array.isArray(docs.initiationReasons)
                    ? docs.initiationReasons.push(data)
                    : (docs.initiationReasons = [data])
                },
              ),
            )
          } catch {}
        },
      }),
      deleteInitiationReason: build.mutation<
        DeleteInitiationReasonSuccessResponse,
        DeleteInitiationReasonMutationArgs
      >({
        query: ({ id }) => ({
          url: deleteInitiationReasonUrl(id),
          method: HttpMethodEnum.Delete,
        }),
        onQueryStarted: async ({ id, taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (data: GetTaskCompletionDocumentsSuccessResponse) => {
                  if (data.initiationReasons?.length) {
                    data.initiationReasons = data.initiationReasons.filter((r) => r.id !== id)
                  }
                },
              ),
            )
          } catch {}
        },
      }),

      createCompletedWork: build.mutation<
        CreateTaskCompletedWorkSuccessResponse,
        CreateTaskCompletedWorkMutationArgs
      >({
        query: ({ taskId, ...data }) => ({
          url: createCompletedWorkUrl(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (docs: GetTaskCompletionDocumentsSuccessResponse) => {
                  Array.isArray(docs.workList) ? docs.workList.push(data) : (docs.workList = [data])
                },
              ),
            )
          } catch {}
        },
      }),
      deleteCompletedWork: build.mutation<
        DeleteCompletedWorkSuccessResponse,
        DeleteCompletedWorkMutationArgs
      >({
        query: ({ id }) => ({
          url: deleteCompletedWorkUrl(id),
          method: HttpMethodEnum.Delete,
        }),
        onQueryStarted: async ({ id, taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                'getTaskCompletionDocuments' as never,
                { taskId } as never,
                (data: GetTaskCompletionDocumentsSuccessResponse) => {
                  if (data.workList?.length) {
                    data.workList = data.workList.filter((r) => r.id !== id)
                  }
                },
              ),
            )
          } catch {}
        },
      }),

      getTaskJournal: build.query<GetTaskJournalSuccessResponse, GetTaskJournalQueryArgs>({
        query: ({ taskId, ...params }) => ({
          url: getTaskJournalUrl(taskId),
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      getTaskJournalCsv: build.query<GetTaskJournalCsvSuccessResponse, GetTaskJournalCsvQueryArgs>({
        query: ({ taskId }) => ({
          url: getTaskJournalCsvUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createReclassificationRequest: build.mutation<
        CreateTaskReclassificationRequestSuccessResponse,
        CreateTaskReclassificationRequestMutationArgs
      >({
        query: ({ taskId, ...payload }) => ({
          url: createTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                TaskApiTriggerEnum.GetTask as never,
                taskId as never,
                (task: GetTaskSuccessResponse) => {
                  task.extendedStatus = TaskExtendedStatusEnum.InReclassification
                },
              ),
            )
          } catch {}
        },
      }),
      getReclassificationRequest: build.query<
        GetTaskReclassificationRequestSuccessResponse,
        GetTaskReclassificationRequestQueryArgs
      >({
        query: ({ taskId }) => ({
          url: getTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      createSuspendRequest: build.mutation<
        CreateTaskSuspendRequestSuccessResponse,
        CreateTaskSuspendRequestMutationArgs
      >({
        query: ({ taskId, ...payload }) => ({
          url: createTaskSuspendRequestUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: suspendRequest } = await queryFulfilled

            dispatch(
              taskApiService.util.updateQueryData(
                TaskApiTriggerEnum.GetTask as never,
                taskId as never,
                (task: GetTaskSuccessResponse) => {
                  task.suspendRequest = suspendRequest
                },
              ),
            )
          } catch {}
        },
      }),
      deleteSuspendRequest: build.mutation<
        DeleteTaskSuspendRequestSuccessResponse,
        DeleteTaskSuspendRequestMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error
            ? isNotFoundError(error as ErrorResponse)
              ? [TaskApiTagEnum.Task]
              : []
            : [TaskApiTagEnum.Task],
        query: ({ taskId }) => ({
          url: deleteTaskSuspendRequestUrl(taskId),
          method: HttpMethodEnum.Delete,
        }),
      }),

      updateTaskWorkGroup: build.mutation<
        UpdateTaskWorkGroupSuccessResponse,
        UpdateTaskWorkGroupMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [TaskApiTagEnum.Tasks, TaskApiTagEnum.TaskCounters],
        query: ({ taskId, ...payload }) => ({
          url: updateTaskWorkGroupUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      deleteTaskWorkGroup: build.mutation<
        DeleteTaskWorkGroupSuccessResponse,
        DeleteTaskWorkGroupMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [TaskApiTagEnum.Tasks, TaskApiTagEnum.TaskCounters],
        query: ({ taskId, ...payload }) => ({
          url: deleteTaskWorkGroupUrl(taskId),
          method: HttpMethodEnum.Delete,
          data: payload,
        }),
      }),

      createTaskAttachment: build.mutation<
        CreateTaskAttachmentSuccessResponse,
        CreateTaskAttachmentMutationArgs
      >({
        query: ({ taskId, file, parentType }) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append(decamelize('parentType'), parentType)

          return {
            url: createTaskAttachmentUrl(taskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      createTaskRegistrationFNRequest: build.mutation<
        CreateTaskRegistrationFNRequestSuccessResponse,
        CreateTaskRegistrationFNRequestMutationArgs
      >({
        invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
        query: ({ taskId, ...data }) => ({
          url: createTaskRegistrationFNRequestUrl(taskId),
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      getTaskRegistrationRequestRecipientsFN: build.query<
        GetTaskRegistrationRequestRecipientsFNSuccessResponse,
        GetTaskRegistrationRequestRecipientsFNQueryArgs
      >({
        query: ({ taskId }) => ({
          url: getTaskRegistrationRequestRecipientsFNUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      [TaskApiTriggerEnum.GetSubTaskList]: build.query<
        GetSubTaskListSuccessResponse,
        GetSubTaskListQueryArgs
      >({
        query: ({ taskId }) => ({
          url: getSubTaskListUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      [TaskApiTriggerEnum.CreateSubTask]: build.mutation<
        CreateSubTaskSuccessResponse,
        CreateSubTaskMutationArgs
      >({
        query: ({ taskId, ...payload }) => ({
          url: createSubTaskUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data: newSubTask } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                TaskApiTriggerEnum.GetSubTaskList as never,
                { taskId } as never,
                (subTaskList: SubTaskModel[]) => {
                  subTaskList.unshift(newSubTask)
                },
              ),
            )
          } catch {}
        },
      }),

      classifyTaskWorkType: build.mutation<
        ClassifyTaskWorkTypeSuccessResponse,
        ClassifyTaskWorkTypeMutationArgs
      >({
        invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
        query: ({ taskId, ...data }) => ({
          url: makeClassifyTaskWorkTypeUrl({ taskId }),
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
  useGetTaskListMapQuery,

  useGetTaskWorkPerformedActMutation,

  useGetTaskCompletionDocumentsQuery,
  useCreateTaskCompletionDocumentsMutation,
  useCreateInitiationReasonMutation,
  useDeleteInitiationReasonMutation,
  useCreateCompletedWorkMutation,
  useDeleteCompletedWorkMutation,

  useResolveTaskMutation,
  useTakeTaskMutation,
  useUpdateTaskDescriptionMutation,
  useUpdateTaskDeadlineMutation,

  useGetTaskCommentListQuery,
  useCreateTaskCommentMutation,

  useUpdateTaskAssigneeMutation,

  useGetTaskJournalQuery,
  useLazyGetTaskJournalCsvQuery,

  useCreateReclassificationRequestMutation,
  useGetReclassificationRequestQuery,

  useCreateSuspendRequestMutation,
  useDeleteSuspendRequestMutation,

  useUpdateTaskWorkGroupMutation,
  useDeleteTaskWorkGroupMutation,

  useCreateSubTaskMutation,
  useGetSubTaskListQuery,

  useCreateTaskRegistrationFNRequestMutation,
  useGetTaskRegistrationRequestRecipientsFNQuery,

  useCreateTaskAttachmentMutation,

  useClassifyTaskWorkTypeMutation,
} = taskApiService

export default taskApiService
