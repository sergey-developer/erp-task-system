import {
  CreateTaskReclassificationRequestMutationArgsModel,
  GetTaskReclassificationRequestQueryArgsModel,
} from 'modules/task/components/TaskView/models'
import { TaskReclassificationRequestModel } from 'modules/task/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskReclassificationRequestApiService = api.injectEndpoints({
  endpoints: (build) => ({
    createReclassificationRequest: build.mutation<
      void,
      CreateTaskReclassificationRequestMutationArgsModel
    >({
      query: ({ taskId, ...body }) => ({
        url: `/tasks/${taskId}/reclassification_requests/`,
        method: HttpMethodEnum.POST,
        data: body,
      }),
    }),
    getReclassificationRequest: build.query<
      TaskReclassificationRequestModel,
      GetTaskReclassificationRequestQueryArgsModel
    >({
      query: (taskId) => ({
        url: `/tasks/${taskId}/reclassification_request/`,
        method: HttpMethodEnum.GET,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateReclassificationRequestMutation,
  useGetReclassificationRequestQuery,
} = taskReclassificationRequestApiService
