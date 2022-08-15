import { CreateTaskReclassificationRequestMutationArgsModel } from 'modules/task/components/TaskView/models/createTaskReclassificationRequest.model'
import { HttpMethodEnum } from 'shared/constants/http'
import { api } from 'shared/services/api'

const taskReclassificationRequestApiService = api.injectEndpoints({
  endpoints: (build) => ({
    createReclassificationRequest: build.mutation<
      void,
      CreateTaskReclassificationRequestMutationArgsModel
    >({
      query: ({ taskId, ...body }) => ({
        url: `/tasks/${taskId}/reclassification_request/`,
        method: HttpMethodEnum.POST,
        data: body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateReclassificationRequestMutation } =
  taskReclassificationRequestApiService
