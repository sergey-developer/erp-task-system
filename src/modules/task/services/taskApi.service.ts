import { GetTaskListTransformedResponse } from 'modules/task/components/TaskList/interfaces'
import {
  GetTaskCountersResponseModel,
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
} from 'modules/task/components/TaskList/models'
import {
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
  ResolveTaskMutationArgsModel,
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskWorkGroupMutationArgsModel,
} from 'modules/task/components/TaskView/models'
import { TaskEndpointsTagsEnum } from 'modules/task/constants/enums'
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
          url: '/tasks',
          method: HttpMethodEnum.GET,
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
          url: '/tasks/counters',
          method: HttpMethodEnum.GET,
        }),
      }),
      getTask: build.query<GetTaskResponseModel, GetTaskQueryArgsModel>({
        query: (id) => ({
          url: `/tasks/${id}`,
          method: HttpMethodEnum.GET,
        }),
        providesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
      }),
      resolveTask: build.mutation<void, ResolveTaskMutationArgsModel>({
        query: ({ taskId, ...body }) => ({
          url: `/tasks/${taskId}/resolution/`,
          method: HttpMethodEnum.POST,
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
          url: `/tasks/${taskId}/work-group/`,
          method: HttpMethodEnum.POST,
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
          url: `/tasks/${taskId}/assignee/`,
          method: HttpMethodEnum.POST,
          data: body,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointsTagsEnum.Task],
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
} = taskApiService
