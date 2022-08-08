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
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskApiService = api.injectEndpoints({
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
    }),
    resolveTask: build.mutation<null, ResolveTaskMutationArgsModel>({
      query: (queryArg) => {
        const { taskId, ...body } = queryArg
        return {
          url: `/tasks/${taskId}/resolution/`,
          method: HttpMethodEnum.POST,
          data: body,
        }
      },
    }),
    updateTaskWorkGroup: build.mutation<
      void,
      UpdateTaskWorkGroupMutationArgsModel
    >({
      query: (queryArg) => {
        const { taskId, ...body } = queryArg
        return {
          url: `/tasks/${taskId}/work-group/`,
          method: HttpMethodEnum.POST,
          data: body,
        }
      },
    }),
    updateTaskAssignee: build.mutation<
      void,
      UpdateTaskAssigneeMutationArgsModel
    >({
      query: (queryArg) => {
        const { taskId, ...body } = queryArg
        return {
          url: `/tasks/${taskId}/assignee/`,
          method: HttpMethodEnum.POST,
          data: body,
        }
      },
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

export default taskApiService
