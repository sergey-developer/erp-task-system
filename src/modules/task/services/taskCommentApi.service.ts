import {
  CreateTaskCommentMutationArgs,
  CreateTaskCommentSuccessResponse,
  GetTaskCommentListQueryArgs,
  GetTaskCommentListSuccessResponse,
} from 'modules/task/models'
import {
  createTaskCommentUrl,
  getTaskCommentListUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import { TaskCommentEndpointNameEnum } from '../constants/api'
import taskApiService from './taskApi.service'

const taskCommentApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskCommentEndpointNameEnum.CreateTaskComment]: build.mutation<
      CreateTaskCommentSuccessResponse,
      CreateTaskCommentMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: createTaskCommentUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newComment } = await queryFulfilled

          dispatch(
            apiService.util.updateQueryData(
              TaskCommentEndpointNameEnum.GetTaskCommentList as never,
              taskId as never,
              (commentList: GetTaskCommentListSuccessResponse) => {
                commentList.unshift(newComment)
              },
            ),
          )
        } catch {}
      },
    }),
    [TaskCommentEndpointNameEnum.GetTaskCommentList]: build.query<
      GetTaskCommentListSuccessResponse,
      GetTaskCommentListQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskCommentListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery, useCreateTaskCommentMutation } =
  taskCommentApiService
