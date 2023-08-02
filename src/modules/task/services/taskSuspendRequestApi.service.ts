import { TaskApiTriggerEnum, TaskApiTagEnum } from 'modules/task/constants'
import {
  CreateTaskSuspendRequestMutationArgs,
  CreateTaskSuspendRequestSuccessResponse,
  DeleteTaskSuspendRequestMutationArgs,
  DeleteTaskSuspendRequestSuccessResponse,
  GetTaskSuccessResponse,
} from 'modules/task/models'
import {
  createTaskSuspendRequestUrl,
  deleteTaskSuspendRequestUrl,
} from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorResponse, isNotFoundError } from 'shared/services/api'

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
              TaskApiTriggerEnum.GetTask as never,
              taskId as never,
              (task: GetTaskSuccessResponse) => {
                task.suspendRequest = suspendRequest
              },
            ),
          )
        } catch {}
      },
    }),
    deleteSuspendRequest: build.mutation<
      DeleteTaskSuspendRequestSuccessResponse,
      DeleteTaskSuspendRequestMutationArgs
    >({
      query: ({ taskId }) => ({
        url: deleteTaskSuspendRequestUrl(taskId),
        method: HttpMethodEnum.Delete,
      }),
      invalidatesTags: (result, error) =>
        error
          ? isNotFoundError(error as ErrorResponse)
            ? [TaskApiTagEnum.Task]
            : []
          : [TaskApiTagEnum.Task],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateSuspendRequestMutation,
  useDeleteSuspendRequestMutation,
} = taskSuspendRequestApiService
