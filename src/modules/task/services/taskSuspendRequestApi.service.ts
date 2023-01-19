import {
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse,
  DeleteTaskSuspendRequestMutationArgsModel,
  DeleteTaskSuspendRequestResponseModel,
  GetTaskResponseModel,
} from 'modules/task/models'
import {
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorResponse, isNotFoundError } from 'shared/services/api'

import { TaskEndpointNameEnum, TaskEndpointTagEnum } from '../constants/api'
import taskApiService from './taskApi.service'

const taskSuspendRequestApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    createSuspendRequest: build.mutation<
      CreateTaskSuspendRequestSuccessResponse,
      CreateTaskSuspendRequestMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: createTaskSuspendRequestUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: suspendRequest } = await queryFulfilled

          dispatch(
            taskApiService.util.updateQueryData(
              TaskEndpointNameEnum.GetTask as never,
              taskId as never,
              (task: GetTaskResponseModel) => {
                task.suspendRequest = suspendRequest
              },
            ),
          )
        } catch {}
      },
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
