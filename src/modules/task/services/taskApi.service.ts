import {
  TaskEndpointsEnum,
  TaskEndpointsTagsEnum,
} from 'modules/task/constants/api'
import { GetTaskListTransformedResponse } from 'modules/task/features/TaskList/interfaces'
import {
  GetTaskCountersResponseModel,
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
} from 'modules/task/features/TaskList/models'
import {
  GetTaskJournalQueryArgsModel,
  GetTaskJournalResponseModel,
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
  ResolveTaskMutationArgsModel,
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskWorkGroupMutationArgsModel,
} from 'modules/task/features/TaskView/models'
import {
  getResolveTaskUrl,
  getTaskAssigneeUrl,
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
        query: (data) => ({
          url: TaskEndpointsEnum.TaskList,
          method: HttpMethodEnum.Get,
          params: data,
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
      getTaskCounters: build.query<GetTaskCountersResponseModel, null>({
        query: () => ({
          url: TaskEndpointsEnum.TaskCounters,
          method: HttpMethodEnum.Get,
        }),
      }),
      getTask: build.query<GetTaskResponseModel, GetTaskQueryArgsModel>({
        query: (id) => ({
          url: getTaskUrl(id),
          method: HttpMethodEnum.Get,
        }),
        providesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
      }),
      resolveTask: build.mutation<void, ResolveTaskMutationArgsModel>({
        query: ({ taskId, ...body }) => ({
          url: getResolveTaskUrl(taskId),
          method: HttpMethodEnum.Post,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.TaskList],
      }),
      updateTaskWorkGroup: build.mutation<
        void,
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
      updateTaskAssignee: build.mutation<
        void,
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
    }),
    overrideExisting: false,
  })

export const {
  useGetTaskQuery,
  useGetTaskListQuery,
  useResolveTaskMutation,
  useUpdateTaskAssigneeMutation,
  useUpdateTaskWorkGroupMutation,
  useGetTaskCountersQuery,
  useGetTaskJournalQuery,
} = taskApiService
