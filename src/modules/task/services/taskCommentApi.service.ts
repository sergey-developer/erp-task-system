import { TaskEndpointsEnum } from 'modules/task/constants/api'
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
        url: TaskEndpointsEnum.TaskCommentList.replace(':id', String(id)),
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetTaskCommentListQuery } = taskCommentApiService
