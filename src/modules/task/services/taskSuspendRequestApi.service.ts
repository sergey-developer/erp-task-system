import {
  CreateTaskSuspendRequestMutationArgsModel,
  CreateTaskSuspendRequestSuccessResponse,
  DeleteTaskSuspendRequestMutationArgsModel,
  DeleteTaskSuspendRequestResponseModel,
} from 'modules/task/models'
import {
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorResponse, isNotFoundError } from 'shared/services/api'

import { TaskEndpointTagEnum } from '../constants/api'
import taskApiService from './taskApi.service'

const taskSuspendRequestApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    createSuspendRequest: build.mutation<
      CreateTaskSuspendRequestSuccessResponse,
      CreateTaskSuspendRequestMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: createTaskSuspendRequestUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
    }),
    deleteSuspendRequest: build.mutation<
      DeleteTaskSuspendRequestResponseModel,
      DeleteTaskSuspendRequestMutationArgsModel
    >({
      query: ({ taskId }) => ({
        url: deleteTaskSuspendRequestUrl(taskId),
        method: HttpMethodEnum.Delete,
      }),
      invalidatesTags: (result, error) =>
        error
          ? isNotFoundError(error as ErrorResponse)
            ? [TaskEndpointTagEnum.Task]
            : []
          : [TaskEndpointTagEnum.Task],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateSuspendRequestMutation,
  useDeleteSuspendRequestMutation,
} = taskSuspendRequestApiService
