import { TaskEndpointTagEnum } from 'modules/task/constants/api'
import {
  DeleteTaskWorkGroupMutationArgsModel,
  DeleteTaskWorkGroupResponseModel,
  UpdateTaskWorkGroupMutationArgsModel,
  UpdateTaskWorkGroupResponseModel,
} from 'modules/task/models'
import { getTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskWorkGroupApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    updateTaskWorkGroup: build.mutation<
      UpdateTaskWorkGroupResponseModel,
      UpdateTaskWorkGroupMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskWorkGroupUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.TaskList],
    }),
    deleteTaskWorkGroup: build.mutation<
      DeleteTaskWorkGroupResponseModel,
      DeleteTaskWorkGroupMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskWorkGroupUrl(taskId),
        method: HttpMethodEnum.Delete,
        data: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.TaskList],
    }),
  }),
  overrideExisting: false,
})

export const {
  useUpdateTaskWorkGroupMutation,
  useDeleteTaskWorkGroupMutation,
} = taskWorkGroupApiService
