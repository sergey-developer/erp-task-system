import { getPaginatedList } from 'lib/antd/utils'

import {
  TaskApiEnum,
  TaskApiTagEnum,
  TaskApiTriggerEnum,
  TaskExtendedStatusEnum,
} from 'modules/task/constants/task'
import {
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse,
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
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse,
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
  SubTaskModel,
  TakeTaskMutationArgs,
  TakeTaskSuccessResponse,
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'
import {
  createSubTaskUrl,
  getSubTaskListUrl,
  getTaskUrl,
  getTaskWorkPerformedActUrl,
  resolveTaskUrl,
  takeTaskUrl,
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

        formData.append('tech_resolution', techResolution)

        if (userResolution) {
          formData.append('user_resolution', userResolution)
        }

        if (attachments?.length) {
          attachments.forEach((att) => formData.append('attachments', att))
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

  useCreateSubTaskMutation,
  useGetSubTaskListQuery,
} = taskApiService

export default taskApiService
