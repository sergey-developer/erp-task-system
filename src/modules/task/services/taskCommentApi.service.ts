import {
  CreateTaskCommentMutationArgsModel,
  CreateTaskCommentResponseModel,
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import taskApiService from './taskApi.service'

const taskCommentApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    createTaskComment: build.mutation<
      CreateTaskCommentResponseModel,
      CreateTaskCommentMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskCommentUrl(taskId),
        method: HttpMethodEnum.Post,
        body: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newComment } = await queryFulfilled

          dispatch(
            apiService.util.updateQueryData(
              'getTaskCommentList' as never,
              taskId as never,
              (commentList: GetTaskCommentListResponseModel) => {
                commentList.unshift(newComment)
              },
            ),
          )
        } catch {}
      },
    }),
    getTaskCommentList: build.query<
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
