import {
  cancelSubTaskUrl,
  createSubTaskUrl,
  getSubTaskListUrl,
  reworkSubTaskUrl,
} from 'modules/task/utils'
import { TaskStatusEnum } from 'modules/task/constants'
import {
  CancelSubTaskMutationArgs,
  CancelSubTaskSuccessResponse,
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse,
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse,
  ReworkSubTaskMutationArgs,
  ReworkSubTaskSuccessResponse,
  SubTaskModel,
} from 'modules/task/models'
import { SubTaskApiTriggerEnum } from 'modules/task/services/subTaskApiService'
import { TaskApiTriggerEnum } from 'modules/task/services/taskApiService'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const subTaskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [TaskApiTriggerEnum.GetSubTaskList]: build.query<
      GetSubTaskListSuccessResponse,
      GetSubTaskListQueryArgs
    >({
      query: (taskId) => ({
        url: getSubTaskListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    [TaskApiTriggerEnum.CreateSubTask]: build.mutation<
      CreateSubTaskSuccessResponse,
      CreateSubTaskMutationArgs
    >({
      query: ({ taskId, ...payload }) => ({
        url: createSubTaskUrl(taskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newSubTask } = await queryFulfilled

          dispatch(
            baseApiService.util.updateQueryData(
              TaskApiTriggerEnum.GetSubTaskList as never,
              taskId as never,
              (subTaskList: SubTaskModel[]) => {
                subTaskList.unshift(newSubTask)
              },
            ),
          )
        } catch {}
      },
    }),
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
            baseApiService.util.updateQueryData(
              TaskApiTriggerEnum.GetSubTaskList as never,
              taskId as never,
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
            baseApiService.util.updateQueryData(
              TaskApiTriggerEnum.GetSubTaskList as never,
              taskId as never,
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

export const {
  useCreateSubTaskMutation,
  useCancelSubTaskMutation,
  useReworkSubTaskMutation,
  useGetSubTaskListQuery,
} = subTaskApiService
