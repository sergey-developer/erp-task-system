import {
  GetTaskCommentListQueryArgsModel,
  GetTaskCommentListResponseModel,
} from 'modules/task/components/TaskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskCommentApiService = api.injectEndpoints({
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

export default taskCommentApiService
