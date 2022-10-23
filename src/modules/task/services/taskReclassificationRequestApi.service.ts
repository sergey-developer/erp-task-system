import { TaskEndpointsTagsEnum } from 'modules/task/constants/api'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  CreateTaskReclassificationRequestResponseModel,
  GetTaskReclassificationRequestQueryArgsModel,
  GetTaskReclassificationRequestResponseModel,
} from 'modules/task/features/TaskView/models'
import {
  getCreateTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const taskReclassificationRequestApiService = apiService
  .enhanceEndpoints({
    addTagTypes: [TaskEndpointsTagsEnum.TaskReclassificationRequest],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createReclassificationRequest: build.mutation<
        CreateTaskReclassificationRequestResponseModel,
        CreateTaskReclassificationRequestMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getCreateTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.Post,
          data: body,
        }),
        invalidatesTags: [TaskEndpointsTagsEnum.TaskReclassificationRequest],
      }),
      getReclassificationRequest: build.query<
        GetTaskReclassificationRequestResponseModel,
        GetTaskReclassificationRequestQueryArgsModel
      >({
        query: (taskId) => ({
          url: getTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.Get,
        }),
        providesTags: [TaskEndpointsTagsEnum.TaskReclassificationRequest],
      }),
    }),
    overrideExisting: false,
  })

export const {
  useCreateReclassificationRequestMutation,
  useGetReclassificationRequestQuery,
} = taskReclassificationRequestApiService
