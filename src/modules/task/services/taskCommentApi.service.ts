import {
  CreateTaskCommentMutationArgsModel,
  CreateTaskCommentResponseModel,
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import { TaskCommentEndpointNameEnum } from '../constants/api'
import taskApiService from './taskApi.service'

const taskCommentApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskCommentEndpointNameEnum.CreateTaskComment]: build.mutation<
      CreateTaskCommentResponseModel,
      CreateTaskCommentMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskCommentUrl(taskId),
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
              (commentList: GetTaskCommentListResponseModel) => {
                commentList.unshift(newComment)
              },
            ),
          )
        } catch {}
      },
    }),
    [TaskCommentEndpointNameEnum.GetTaskCommentList]: build.query<
      GetTaskCommentListResponseModel,
      GetTaskCommentListQueryArgsModel
    >({
      query: (taskId) => ({
        url: getTaskCommentUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery, useCreateTaskCommentMutation } =
  taskCommentApiService
