import {
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskCommentListUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskCommentApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    getTaskCommentList: build.query<
      GetTaskCommentListResponseModel,
      GetTaskCommentListQueryArgsModel
    >({
      query: (id) => ({
        url: getTaskCommentListUrl(id),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery } = taskCommentApiService
