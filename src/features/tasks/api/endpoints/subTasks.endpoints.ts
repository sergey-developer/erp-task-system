import {
  SubTasksEndpointsNamesEnum,
  TasksEndpointsNamesEnum,
  TaskStatusEnum,
} from 'features/tasks/api/constants'
import {
  CancelSubTaskRequest,
  CancelSubTaskResponse,
  ReworkSubTaskRequest,
  ReworkSubTaskResponse,
} from 'features/tasks/api/schemas'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import { SubTaskDTO } from '../dto'
import { makeCancelSubTaskApiPath, makeReworkSubTaskApiPath } from '../helpers'

const subTasksEndpoints = baseApi.injectEndpoints({
  endpoints: (build) => ({
    [SubTasksEndpointsNamesEnum.CancelSubTask]: build.mutation<
      CancelSubTaskResponse,
      CancelSubTaskRequest
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: makeCancelSubTaskApiPath(subTaskId),
        method: HttpMethodEnum.Delete,
        data: payload,
      }),
      onQueryStarted: async ({ subTaskId, taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              TasksEndpointsNamesEnum.GetSubTasks as never,
              { taskId } as never,
              (subTaskList: SubTaskDTO[]) => {
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
    [SubTasksEndpointsNamesEnum.ReworkSubTask]: build.mutation<
      ReworkSubTaskResponse,
      ReworkSubTaskRequest
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: makeReworkSubTaskApiPath(subTaskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ subTaskId, taskId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled

          dispatch(
            baseApi.util.updateQueryData(
              TasksEndpointsNamesEnum.GetSubTasks as never,
              { taskId } as never,
              (subTaskList: SubTaskDTO[]) => {
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
})

export const { useCancelSubTaskMutation, useReworkSubTaskMutation } = subTasksEndpoints
