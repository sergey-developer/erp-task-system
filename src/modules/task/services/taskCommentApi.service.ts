import {
  CreateTaskCommentMutationArgsModel,
  CreateTaskCommentResponseModel,
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskCommentApiService = apiService.injectEndpoints({
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
    }),
    getTaskCommentList: build.query<
      GetTaskCommentListResponseModel,
      GetTaskCommentListQueryArgsModel
    >({
      query: (id) => ({
        url: getTaskCommentUrl(id),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery, useCreateTaskCommentMutation } =
  taskCommentApiService
