import { TaskEndpointTagEnum } from 'modules/task/constants/api'
import {
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskAssigneeResponseModel,
} from 'modules/task/models'
import { getTaskAssigneeUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskAssigneeApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    updateTaskAssignee: build.mutation<
      UpdateTaskAssigneeResponseModel,
      UpdateTaskAssigneeMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getTaskAssigneeUrl(taskId),
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
