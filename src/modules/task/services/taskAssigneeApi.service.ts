import { TaskEndpointsTagsEnum } from 'modules/task/constants/api'
import {
  UpdateTaskAssigneeMutationArgsModel,
  UpdateTaskAssigneeResponseModel,
} from 'modules/task/features/TaskView/models'
import { getTaskAssigneeUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskAssigneeApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    updateTaskAssignee: build.mutation<
      UpdateTaskAssigneeResponseModel,
      UpdateTaskAssigneeMutationArgsModel
    >({
      query: ({ taskId, ...body }) => ({
        url: getTaskAssigneeUrl(taskId),
        method: HttpMethodEnum.Post,
        data: body,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [TaskEndpointsTagsEnum.Task],
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateTaskAssigneeMutation } = taskAssigneeApiService
