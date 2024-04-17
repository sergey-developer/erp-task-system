import { decamelize } from 'humps'

import { getPaginatedList } from 'lib/antd/utils'

import {
  TaskApiEnum,
  TaskApiTagEnum,
  TaskApiTriggerEnum,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/task'
import {
  CreateCompletedWorkMutationArgs,
  CreateCompletedWorkSuccessResponse,
  CreateInitiationReasonMutationArgs,
  CreateInitiationReasonSuccessResponse,
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse,
  CreateTaskAttachmentMutationArgs,
  CreateTaskAttachmentSuccessResponse,
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
  CreateTaskCompletionDocumentsMutationArgs,
  CreateTaskCompletionDocumentsSuccessResponse,
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
  CreateTaskRegistrationFNRequestMutationArgs,
  CreateTaskRegistrationFNRequestSuccessResponse,
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
  GetTaskListQueryArgs,
  GetTaskListSuccessResponse,
  GetTaskQueryArgs,
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
  GetTaskRegistrationRequestRecipientsFNQueryArgs,
  GetTaskRegistrationRequestRecipientsFNSuccessResponse,
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
} from 'modules/task/models'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'
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
  resolveTaskUrl,
  takeTaskUrl,
  updateTaskDeadlineUrl,
  updateTaskDescriptionUrl,
} from 'modules/task/utils/task'
import { updateTaskAssigneeUrl } from 'modules/task/utils/taskAssignee'
import { createTaskCommentUrl, getTaskCommentListUrl } from 'modules/task/utils/taskComment'
import { getTaskJournalCsvUrl, getTaskJournalUrl } from 'modules/task/utils/taskJournal'
import {
  createTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
} from 'modules/task/utils/taskReclassificationRequest'
import {
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
} from 'modules/task/utils/taskSuspendRequest'
import { deleteTaskWorkGroupUrl, updateTaskWorkGroupUrl } from 'modules/task/utils/taskWorkGroup'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService, ErrorResponse, isNotFoundError } from 'shared/services/baseApi'
import { MaybeUndefined } from 'shared/types/utils'

const taskApiService = baseApiService
  .enhanceEndpoints({ addTagTypes: [TaskApiTagEnum.TaskCounters] })
  .injectEndpoints({
    endpoints: (build) => ({
      [TaskApiTriggerEnum.GetTaskList]: build.query<
        GetTaskListTransformedSuccessResponse,
        GetTaskListQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskList]),
        query: (params) => ({
          url: TaskApiEnum.GetTaskList,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetTaskListSuccessResponse, meta, arg) =>
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
          error ? [] : [TaskApiTagEnum.TaskList, TaskApiTagEnum.TaskCounters],
        query: ({
          taskId,
          techResolution,
          userResolution,
          spentHours,
          spentMinutes,
          attachments,
        }) => {
          const formData = new FormData()

          formData.append(decamelize('techResolution'), techResolution)
          formData.append(decamelize('spentHours'), String(spentHours))
          formData.append(decamelize('spentMinutes'), String(spentMinutes))
          if (userResolution) formData.append(decamelize('userResolution'), userResolution)

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
          error ? [] : [TaskApiTagEnum.Task, TaskApiTagEnum.TaskCounters],
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
              baseApiService.util.updateQueryData(
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
          error ? [] : [TaskApiTagEnum.Task, TaskApiTagEnum.TaskCounters],
        query: ({ taskId, ...payload }) => ({
          url: updateTaskAssigneeUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
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
        CreateCompletedWorkSuccessResponse,
        CreateCompletedWorkMutationArgs
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
          error ? [] : [TaskApiTagEnum.TaskList, TaskApiTagEnum.TaskCounters],
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
          error ? [] : [TaskApiTagEnum.TaskList, TaskApiTagEnum.TaskCounters],
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
        query: (taskId) => ({
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
              baseApiService.util.updateQueryData(
                TaskApiTriggerEnum.GetSubTaskList as never,
                taskId as never,
                (subTaskList: SubTaskModel[]) => {
                  subTaskList.unshift(newSubTask)
                },
              ),
            )
          } catch {}
        },
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetTaskQuery,

  useGetTaskCountersQuery,

  useGetTaskListQuery,
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
} = taskApiService

export default taskApiService
