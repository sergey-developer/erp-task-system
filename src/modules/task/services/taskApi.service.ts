import {
  TaskEndpointEnum,
  TaskEndpointNameEnum,
  TaskEndpointTagEnum,
} from 'modules/task/constants/api'
import { GetTaskListTransformedResponse } from 'modules/task/interfaces'
import {
  GetTaskCountersQueryArgsModel,
  GetTaskCountersResponseModel,
  GetTaskListQueryArgsModel,
  GetTaskListResponseModel,
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
  ResolveTaskMutationArgsModel,
  ResolveTaskResponseModel,
  TakeTaskMutationArgsModel,
  TakeTaskResponseModel,
} from 'modules/task/models'
import {
  getResolveTaskUrl,
  getTakeTaskUrl,
  getTaskUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskApiService = apiService
  .enhanceEndpoints({
    addTagTypes: [TaskEndpointTagEnum.Task, TaskEndpointTagEnum.TaskList],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      [TaskEndpointNameEnum.GetTaskList]: build.query<
        GetTaskListTransformedResponse,
        GetTaskListQueryArgsModel
      >({
        query: (filter) => ({
          url: TaskEndpointEnum.TaskList,
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
          error ? [] : [TaskEndpointTagEnum.TaskList],
      }),
      [TaskEndpointNameEnum.GetTaskCounters]: build.query<
        GetTaskCountersResponseModel,
        GetTaskCountersQueryArgsModel
      >({
        query: () => ({
          url: TaskEndpointEnum.TaskCounters,
          method: HttpMethodEnum.Get,
        }),
      }),
      [TaskEndpointNameEnum.GetTask]: build.query<
        GetTaskResponseModel,
        GetTaskQueryArgsModel
      >({
        query: (taskId) => ({
          url: getTaskUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
        providesTags: (result, error) =>
          error ? [] : [TaskEndpointTagEnum.Task],
      }),
      [TaskEndpointNameEnum.ResolveTask]: build.mutation<
        ResolveTaskResponseModel,
        ResolveTaskMutationArgsModel
      >({
        query: ({ taskId, ...payload }) => ({
          url: getResolveTaskUrl(taskId),
          method: HttpMethodEnum.Post,
          data: payload,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointTagEnum.TaskList],
      }),
      [TaskEndpointNameEnum.TakeTask]: build.mutation<
        TakeTaskResponseModel,
        TakeTaskMutationArgsModel
      >({
        query: ({ taskId }) => ({
          url: getTakeTaskUrl(taskId),
          method: HttpMethodEnum.Post,
        }),
        invalidatesTags: (result, error) =>
          error ? [] : [TaskEndpointTagEnum.Task],
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetTaskQuery,
  useLazyGetTaskListQuery,
  useResolveTaskMutation,
  useGetTaskCountersQuery,
  useTakeTaskMutation,
} = taskApiService

export default taskApiService
