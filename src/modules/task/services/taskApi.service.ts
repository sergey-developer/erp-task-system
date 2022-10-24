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
  GetTaskQueryArgsModel,
  GetTaskResponseModel,
  ResolveTaskMutationArgsModel,
  ResolveTaskResponseModel,
  TakeTaskMutationArgsModel,
  TakeTaskResponseModel,
} from 'modules/task/features/TaskView/models'
import {
  getResolveTaskUrl,
  getTakeTaskUrl,
  getTaskUrl,
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
    }),
    overrideExisting: false,
  })

export const {
  useGetTaskQuery,
  useGetTaskListQuery,
  useResolveTaskMutation,
  useGetTaskCountersQuery,
  useTakeTaskMutation,
} = taskApiService

export default taskApiService
