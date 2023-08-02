import {
  TaskExtendedStatusEnum,
  TaskApiTriggerEnum,
} from 'modules/task/constants'
import {
  CreateTaskReclassificationRequestMutationArgs,
  CreateTaskReclassificationRequestSuccessResponse,
  GetTaskReclassificationRequestQueryArgs,
  GetTaskReclassificationRequestSuccessResponse,
  GetTaskSuccessResponse,
} from 'modules/task/models'
import {
  createTaskReclassificationRequestUrl,
  getTaskReclassificationRequestUrl,
} from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import taskApiService from './taskApi.service'

const taskReclassificationRequestApiService = taskApiService.injectEndpoints({
  endpoints: (build) => ({
    createReclassificationRequest: build.mutation<
      CreateTaskReclassificationRequestSuccessResponse,
      CreateTaskReclassificationRequestMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: createTaskReclassificationRequestUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            taskApiService.util.updateQueryData(
              TaskApiTriggerEnum.GetTask as never,
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
