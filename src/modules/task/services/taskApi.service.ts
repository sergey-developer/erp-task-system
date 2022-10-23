import {
  TaskEndpointsEnum,
  TaskEndpointsTagsEnum,
} from 'modules/task/constants/api'
import { GetTaskListTransformedResponse } from 'modules/task/features/TaskList/interfaces'
import {
  GetTaskCountersQueryArgsModel,
  GetTaskCountersResponseModel,
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
} from 'modules/task/features/TaskList/models'
import {
  DeleteTaskWorkGroupMutationArgsModel,
  DeleteTaskWorkGroupResponseModel,
  GetTaskJournalCsvQueryArgsModel,
  GetTaskJournalCsvResponseModel,
  GetTaskJournalQueryArgsModel,
  GetTaskJournalResponseModel,
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
  ResolveTaskMutationArgsModel,
  ResolveTaskResponseModel,
  TakeTaskMutationArgsModel,
  TakeTaskResponseModel,
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskAssigneeResponseModel,
  UpdateTaskWorkGroupMutationArgsModel,
  UpdateTaskWorkGroupResponseModel,
} from 'modules/task/features/TaskView/models'
import {
  getResolveTaskUrl,
  getTakeTaskUrl,
  getTaskAssigneeUrl,
  getTaskJournalCsvUrl,
  getTaskJournalUrl,
  getTaskUrl,
  getTaskWorkGroupUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskApiService = apiService
  .enhanceEndpoints({
    addTagTypes: [TaskEndpointsTagsEnum.Task, TaskEndpointsTagsEnum.TaskList],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getTaskList: build.query<
        GetTaskListTransformedResponse,
        GetTaskListQueryArgsModel
      >({
        query: (filter) => ({
          url: TaskEndpointsEnum.TaskList,
          method: HttpMethodEnum.Get,
          params: filter,
        }),
        // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
        transformResponse: (response: GetTaskListResponseModel, meta, arg) => {
          return {
            pagination: {
              current: arg.offset / arg.limit + 1,
              pageSize: arg.limit,
              total: response.count,
            },
            results: response.results,
          }
        },
        providesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.TaskList],
      }),
      getTaskCounters: build.query<
        GetTaskCountersResponseModel,
        GetTaskCountersQueryArgsModel
      >({
        query: () => ({
          url: TaskEndpointsEnum.TaskCounters,
          method: HttpMethodEnum.Get,
        }),
      }),
      getTask: build.query<GetTaskResponseModel, GetTaskQueryArgsModel>({
        query: (taskId) => ({
          url: getTaskUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
        providesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
      }),
      resolveTask: build.mutation<
        ResolveTaskResponseModel,
        ResolveTaskMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getResolveTaskUrl(taskId),
          method: HttpMethodEnum.Post,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.TaskList],
      }),
      takeTask: build.mutation<
        TakeTaskResponseModel,
        TakeTaskMutationArgsModel
      >({
        query: ({ taskId }) => ({
          url: getTakeTaskUrl(taskId),
          method: HttpMethodEnum.Post,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
      }),
      updateTaskWorkGroup: build.mutation<
        UpdateTaskWorkGroupResponseModel,
        UpdateTaskWorkGroupMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getTaskWorkGroupUrl(taskId),
          method: HttpMethodEnum.Post,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.TaskList],
      }),
      deleteTaskWorkGroup: build.mutation<
        DeleteTaskWorkGroupResponseModel,
        DeleteTaskWorkGroupMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getTaskWorkGroupUrl(taskId),
          method: HttpMethodEnum.Delete,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.TaskList],
      }),
      updateTaskAssignee: build.mutation<
        UpdateTaskAssigneeResponseModel,
        UpdateTaskAssigneeMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getTaskAssigneeUrl(taskId),
          method: HttpMethodEnum.Post,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
      }),
      getTaskJournal: build.query<
        GetTaskJournalResponseModel,
        GetTaskJournalQueryArgsModel
      >({
        query: (taskId) => ({
          url: getTaskJournalUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      getTaskJournalCsv: build.query<
        GetTaskJournalCsvResponseModel,
        GetTaskJournalCsvQueryArgsModel
      >({
        query: (taskId) => ({
          url: getTaskJournalCsvUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetTaskQuery,
  useGetTaskListQuery,
  useResolveTaskMutation,
  useUpdateTaskAssigneeMutation,
  useUpdateTaskWorkGroupMutation,
  useDeleteTaskWorkGroupMutation,
  useGetTaskCountersQuery,
  useGetTaskJournalQuery,
  useLazyGetTaskJournalCsvQuery,
  useTakeTaskMutation,
} = taskApiService
