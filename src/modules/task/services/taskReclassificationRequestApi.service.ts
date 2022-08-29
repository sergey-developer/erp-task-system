import { TaskEndpointsTagsEnum } from 'modules/task/constants/enums'
import {
  CreateTaskReclassificationRequestMutationArgsModel,
  GetTaskReclassificationRequestQueryArgsModel,
  TaskDetailsReclassificationRequestModel,
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
        void,
        CreateTaskReclassificationRequestMutationArgsModel
      >({
        query: ({ taskId, ...body }) => ({
          url: getCreateTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.POST,
          data: body,
        }),
        invalidatesTags: [TaskEndpointsTagsEnum.TaskReclassificationRequest],
      }),
      getReclassificationRequest: build.query<
        TaskDetailsReclassificationRequestModel,
        GetTaskReclassificationRequestQueryArgsModel
      >({
        query: (taskId) => ({
          url: getTaskReclassificationRequestUrl(taskId),
          method: HttpMethodEnum.GET,
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
