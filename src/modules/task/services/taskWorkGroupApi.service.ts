import { TaskEndpointsTagsEnum } from 'modules/task/constants/api'
import {
  DeleteTaskWorkGroupMutationArgsModel,
  DeleteTaskWorkGroupResponseModel,
  UpdateTaskWorkGroupMutationArgsModel,
  UpdateTaskWorkGroupResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskWorkGroupApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
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
  }),
  overrideExisting: false,
})

export const {
  useUpdateTaskWorkGroupMutation,
  useDeleteTaskWorkGroupMutation,
} = taskWorkGroupApiService
