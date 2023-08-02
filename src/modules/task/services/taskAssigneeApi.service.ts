import { TaskApiTagEnum } from 'modules/task/constants'
import {
  UpdateTaskAssigneeMutationArgs,
  UpdateTaskAssigneeSuccessResponse,
} from 'modules/task/models'
import { updateTaskAssigneeUrl } from 'modules/task/utils'

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
      invalidatesTags: (result, error) => (error ? [] : [TaskApiTagEnum.Task]),
    }),
  }),
  overrideExisting: false,
})

export const { useUpdateTaskAssigneeMutation } = taskAssigneeApiService
