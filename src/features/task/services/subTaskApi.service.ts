import { SubTaskApiTriggerEnum } from 'features/task/constants/subTask'
import { TaskApiTriggerEnum, TaskStatusEnum } from 'features/task/constants/task'
import {
  CancelSubTaskMutationArgs,
  CancelSubTaskSuccessResponse,
  ReworkSubTaskMutationArgs,
  ReworkSubTaskSuccessResponse,
  SubTaskModel,
} from 'features/task/models'
import { cancelSubTaskUrl, reworkSubTaskUrl } from 'features/task/utils/subTask'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const subTaskApiService = baseApi.injectEndpoints({
  endpoints: (build) => ({
    [SubTaskApiTriggerEnum.CancelSubTask]: build.mutation<
      CancelSubTaskSuccessResponse,
      CancelSubTaskMutationArgs
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: cancelSubTaskUrl(subTaskId),
        method: HttpMethodEnum.Delete,
        data: payload,
      }),
      onQueryStarted: async ({ subTaskId, taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              TaskApiTriggerEnum.GetSubTaskList as never,
              { taskId } as never,
              (subTaskList: SubTaskModel[]) => {
                const subTask = subTaskList.find(({ id }) => id === subTaskId)

                if (subTask) {
                  subTask.status = TaskStatusEnum.Closed
                }
              },
            ),
          )
        } catch {}
      },
    }),
    [SubTaskApiTriggerEnum.ReworkSubTask]: build.mutation<
      ReworkSubTaskSuccessResponse,
      ReworkSubTaskMutationArgs
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: reworkSubTaskUrl(subTaskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ subTaskId, taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              TaskApiTriggerEnum.GetSubTaskList as never,
              { taskId } as never,
              (subTaskList: SubTaskModel[]) => {
                const subTask = subTaskList.find(({ id }) => id === subTaskId)

                if (subTask) {
                  subTask.status = TaskStatusEnum.InProgress
                }
              },
            ),
          )
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
})

export const { useCancelSubTaskMutation, useReworkSubTaskMutation } = subTaskApiService
