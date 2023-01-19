import { TaskExtendedStatusEnum } from 'modules/task/constants/common'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
  GetTaskSuccessResponse,
} from 'modules/task/models'
import {
  getCreateTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'

import { TaskEndpointNameEnum } from '../constants/api'
import taskApiService from './taskApi.service'

const taskReclassificationRequestApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    createReclassificationRequest: build.mutation<
      CreateTaskReclassificationRequestSuccessResponse,
      CreateTaskReclassificationRequestMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: getCreateTaskReclassificationRequestUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            taskApiService.util.updateQueryData(
              TaskEndpointNameEnum.GetTask as never,
              taskId as never,
              (task: GetTaskSuccessResponse) => {
                task.extendedStatus = TaskExtendedStatusEnum.InReclassification
              },
            ),
          )
        } catch {}
      },
    }),
    getReclassificationRequest: build.query<
      GetTaskReclassificationRequestSuccessResponse,
      GetTaskReclassificationRequestQueryArgs
    >({
      query: (taskId) => ({
        url: getTaskReclassificationRequestUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateReclassificationRequestMutation,
  useGetReclassificationRequestQuery,
} = taskReclassificationRequestApiService
