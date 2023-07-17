import { decamelize } from 'humps'

import {
  TaskEndpointEnum,
  TaskEndpointNameEnum,
  TaskEndpointTagEnum,
} from 'modules/task/constants'
import { GetTaskListTransformedResponse } from 'modules/task/interfaces'
import {
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse,
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse,
  GetTaskListQueryArgs,
  GetTaskListSuccessResponse,
  GetTaskQueryArgs,
  GetTaskSuccessResponse,
  GetTaskWorkPerformedActMutationArgs,
  GetTaskWorkPerformedActSuccessResponse,
  ResolveTaskMutationArgs,
  ResolveTaskSuccessResponse,
  TakeTaskMutationArgs,
  TakeTaskSuccessResponse,
} from 'modules/task/models'
import { getTaskUrl, resolveTaskUrl, takeTaskUrl, getTaskWorkPerformedActUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/api'

const taskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskEndpointNameEnum.GetTaskList]: build.query<
      GetTaskListTransformedResponse,
      GetTaskListQueryArgs
    >({
      query: (filter) => ({
        url: TaskEndpointEnum.GetTaskList,
        method: HttpMethodEnum.Get,
        params: filter,
      }),
      // todo: вынести трансформацию ответа под ант пагинацию в общий модуль
      transformResponse: (response: GetTaskListSuccessResponse, meta, arg) => {
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
      GetTaskCountersSuccessResponse,
      GetTaskCountersQueryArgs
    >({
      query: () => ({
        url: TaskEndpointEnum.GetTaskCounters,
        method: HttpMethodEnum.Get,
      }),
    }),
    [TaskEndpointNameEnum.GetFiscalAccumulatorTaskList]: build.query<
      GetFiscalAccumulatorTaskListSuccessResponse,
      GetFiscalAccumulatorTaskListQueryArgs
    >({
      query: (params) => ({
        url: TaskEndpointEnum.GetFiscalAccumulatorTaskList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    [TaskEndpointNameEnum.GetTask]: build.query<
      GetTaskSuccessResponse,
      GetTaskQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
      providesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.Task],
    }),
    [TaskEndpointNameEnum.GetWorkPerformedAct]: build.mutation<
      GetTaskWorkPerformedActSuccessResponse,
      GetTaskWorkPerformedActMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskWorkPerformedActUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    [TaskEndpointNameEnum.ResolveTask]: build.mutation<
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
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.TaskList],
    }),
    [TaskEndpointNameEnum.TakeTask]: build.mutation<
      TakeTaskSuccessResponse,
      TakeTaskMutationArgs
    >({
      query: ({ taskId }) => ({
        url: takeTaskUrl(taskId),
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
  useGetTaskCountersQuery,
  useGetFiscalAccumulatorTaskListQuery,
  useLazyGetTaskListQuery,
  useGetTaskWorkPerformedActMutation,
  useResolveTaskMutation,
  useTakeTaskMutation,
} = taskApiService

export default taskApiService
