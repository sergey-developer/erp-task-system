import {
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskCommentApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskCommentList: build.query<
      GetTaskCommentListResponseModel,
      GetTaskCommentListQueryArgsModel
    >({
      query: (id) => ({
        url: `/tasks/${id}/comments`,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery } = taskCommentApiService
