import { decamelize } from 'humps'

import { getPaginatedList } from 'lib/antd/utils'

import { TaskExtendedStatusEnum } from 'modules/task/constants'
import {
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse,
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestSuccessResponse,
  DeleteTaskWorkGroupMutationArgs,
  DeleteTaskWorkGroupSuccessResponse,
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse,
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
  GetTaskSuccessResponse,
  GetTaskWorkPerformedActMutationArgs,
  GetTaskWorkPerformedActSuccessResponse,
  ResolveTaskMutationArgs,
  ResolveTaskSuccessResponse,
  TakeTaskMutationArgs,
  TakeTaskSuccessResponse,
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'
import {
  getTaskUrl,
  resolveTaskUrl,
  takeTaskUrl,
  getTaskWorkPerformedActUrl,
  createTaskCommentUrl,
  getTaskCommentListUrl,
  updateTaskAssigneeUrl,
  getTaskJournalUrl,
  getTaskJournalCsvUrl,
  createTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
  updateTaskWorkGroupUrl,
  deleteTaskWorkGroupUrl,
} from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService, ErrorResponse, isNotFoundError } from 'shared/services/baseApi'

import { TaskApiEnum, TaskApiTriggerEnum, TaskApiTagEnum } from './constants'

const taskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskApiTriggerEnum.GetTaskList]: build.query<
      GetTaskListTransformedSuccessResponse,
      GetTaskListQueryArgs
    >({
      query: (params) => ({
        url: TaskApiEnum.GetTaskList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetTaskListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
      providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskList]),
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
      GetTaskCountersQueryArgs
    >({
      query: () => ({
        url: TaskApiEnum.GetTaskCounters,
        method: HttpMethodEnum.Get,
      }),
    }),

    [TaskApiTriggerEnum.GetTask]: build.query<GetTaskSuccessResponse, GetTaskQueryArgs>({
      query: (taskId) => ({
        url: getTaskUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
      providesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
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
      query: ({ taskId, techResolution, userResolution, attachments }) => {
        const formData = new FormData()

        formData.append(decamelize('techResolution'), techResolution)

        if (userResolution) {
          formData.append(decamelize('userResolution'), userResolution)
        }

        if (attachments?.length) {
          attachments.forEach((att) => {
            formData.append('attachments', att)
          })
        }

        return {
          url: resolveTaskUrl(taskId),
          method: HttpMethodEnum.Post,
          data: formData,
        }
      },
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskList]),
    }),

    [TaskApiTriggerEnum.TakeTask]: build.mutation<TakeTaskSuccessResponse, TakeTaskMutationArgs>({
      query: ({ taskId }) => ({
        url: takeTaskUrl(taskId),
        method: HttpMethodEnum.Post,
      }),
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
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
              taskId as never,
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

    updateTaskAssignee: build.mutation<
      UpdateTaskAssigneeSuccessResponse,
      UpdateTaskAssigneeMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: updateTaskAssigneeUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
    }),

    getTaskJournal: build.query<GetTaskJournalSuccessResponse, GetTaskJournalQueryArgs>({
      query: ({ taskId }) => ({
        url: getTaskJournalUrl(taskId),
        method: HttpMethodEnum.Get,
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
      query: ({ taskId }) => ({
        url: deleteTaskSuspendRequestUrl(taskId),
        method: HttpMethodEnum.Delete,
      }),
      invalidatesTags: (result, error) =>
        error
          ? isNotFoundError(error as ErrorResponse)
            ? [TaskApiTagEnum.Task]
            : []
          : [TaskApiTagEnum.Task],
    }),

    updateTaskWorkGroup: build.mutation<
      UpdateTaskWorkGroupSuccessResponse,
      UpdateTaskWorkGroupMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: updateTaskWorkGroupUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskList]),
    }),
    deleteTaskWorkGroup: build.mutation<
      DeleteTaskWorkGroupSuccessResponse,
      DeleteTaskWorkGroupMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: deleteTaskWorkGroupUrl(taskId),
        method: HttpMethodEnum.Delete,
        data: payload,
      }),
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.TaskList]),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTaskQuery,

  useGetTaskCountersQuery,

  useLazyGetTaskListQuery,
  useGetTaskListMapQuery,

  useGetTaskWorkPerformedActMutation,

  useResolveTaskMutation,

  useTakeTaskMutation,

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
} = taskApiService

export default taskApiService
