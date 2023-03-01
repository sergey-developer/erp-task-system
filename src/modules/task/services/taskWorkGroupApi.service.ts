import { TaskEndpointTagEnum } from 'modules/task/constants/api'
import {
  DeleteTaskWorkGroupMutationArgs,
  DeleteTaskWorkGroupSuccessResponse,
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import {
  deleteTaskWorkGroupUrl,
  updateTaskWorkGroupUrl,
} from 'modules/task/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskWorkGroupApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    updateTaskWorkGroup: build.mutation<
      UpdateTaskWorkGroupSuccessResponse,
      UpdateTaskWorkGroupMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: updateTaskWorkGroupUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.TaskList],
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
