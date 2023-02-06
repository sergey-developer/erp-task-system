import { TaskEndpointTagEnum } from 'modules/task/constants/api'
import {
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
} from 'modules/task/models'
import { updateTaskAssigneeUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskAssigneeApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    updateTaskAssignee: build.mutation<
      UpdateTaskAssigneeSuccessResponse,
      UpdateTaskAssigneeMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: updateTaskAssigneeUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointTagEnum.Task],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateTaskAssigneeMutation } = taskAssigneeApiService
