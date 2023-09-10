import { decamelize } from 'humps'

import { getPaginatedList } from 'lib/antd/utils'

import {
  TaskApiEnum,
  TaskApiTriggerEnum,
  TaskApiTagEnum,
} from 'modules/task/constants'
import {
  GetFiscalAccumulatorTaskListQueryArgs,
  GetFiscalAccumulatorTaskListSuccessResponse,
  GetTaskCountersQueryArgs,
  GetTaskCountersSuccessResponse,
  GetTaskListMapQueryArgs,
  GetTaskListMapSuccessResponse,
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
import { GetTaskListTransformedSuccessResponse } from 'modules/task/types'
import {
  getTaskUrl,
  resolveTaskUrl,
  takeTaskUrl,
  getTaskWorkPerformedActUrl,
} from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
    [TaskApiTriggerEnum.GetFiscalAccumulatorTaskList]: build.query<
      GetFiscalAccumulatorTaskListSuccessResponse,
      GetFiscalAccumulatorTaskListQueryArgs
    >({
      query: (params) => ({
        url: TaskApiEnum.GetFiscalAccumulatorTaskList,
        method: HttpMethodEnum.Get,
        params,
      }),
    }),
    [TaskApiTriggerEnum.GetTask]: build.query<
      GetTaskSuccessResponse,
      GetTaskQueryArgs
    >({
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
      invalidatesTags: (result, error) =>
        error ? [] : [TaskApiTagEnum.TaskList],
    }),
    [TaskApiTriggerEnum.TakeTask]: build.mutation<
      TakeTaskSuccessResponse,
      TakeTaskMutationArgs
    >({
      query: ({ taskId }) => ({
        url: takeTaskUrl(taskId),
        method: HttpMethodEnum.Post,
      }),
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTaskQuery,
  useGetTaskCountersQuery,
  useGetFiscalAccumulatorTaskListQuery,
  useGetTaskListMapQuery,
  useLazyGetTaskListQuery,
  useGetTaskWorkPerformedActMutation,
  useResolveTaskMutation,
  useTakeTaskMutation,
} = taskApiService

export default taskApiService
