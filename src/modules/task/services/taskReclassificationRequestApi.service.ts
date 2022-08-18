import {
  CreateTaskReclassificationRequestMutationArgsModel,
  GetTaskReclassificationRequestQueryArgsModel,
  TaskDetailsReclassificationRequestModel,
} from 'modules/task/components/TaskView/models'
import { TaskEndpointsTagsEnum } from 'modules/task/constants/enums'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskReclassificationRequestApiService = api
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
          url: `/tasks/${taskId}/reclassification-requests/`,
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
          url: `/tasks/${taskId}/reclassification-request/`,
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
