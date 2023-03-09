import {
  CancelSubTaskMutationArgs,
  CancelSubTaskSuccessResponse,
  CreateSubTaskMutationArgs,
  CreateSubTaskSuccessResponse,
  GetSubTaskListQueryArgs,
  GetSubTaskListSuccessResponse,
  GetSubTaskTemplateListQueryArgs,
  GetSubTaskTemplateListSuccessResponse,
  ReworkSubTaskMutationArgs,
  ReworkSubTaskSuccessResponse,
  SubTaskModel,
} from 'modules/subTask/models'
import {
  cancelSubTaskUrl,
  createSubTaskUrl,
  getSubTaskListUrl,
  getSubTaskTemplateListUrl,
  reworkSubTaskUrl,
} from 'modules/subTask/utils/apiUrls'
import { TaskStatusEnum } from 'modules/task/constants/common'

import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import { SubTaskEndpointNameEnum } from '../constants/api'

const subTaskApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    [SubTaskEndpointNameEnum.GetSubTaskList]: build.query<
      GetSubTaskListSuccessResponse,
      GetSubTaskListQueryArgs
    >({
      query: (taskId) => ({
        url: getSubTaskListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    [SubTaskEndpointNameEnum.GetSubTaskTemplateList]: build.query<
      GetSubTaskTemplateListSuccessResponse,
      GetSubTaskTemplateListQueryArgs
    >({
      query: () => ({
        url: getSubTaskTemplateListUrl(),
        method: HttpMethodEnum.Get,
      }),
    }),
    [SubTaskEndpointNameEnum.CreateSubTask]: build.mutation<
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
            apiService.util.updateQueryData(
              SubTaskEndpointNameEnum.GetSubTaskList as never,
              taskId as never,
              (subTaskList: SubTaskModel[]) => {
                subTaskList.unshift(newSubTask)
              },
            ),
          )
        } catch {}
      },
    }),
    [SubTaskEndpointNameEnum.CancelSubTask]: build.mutation<
      CancelSubTaskSuccessResponse,
      CancelSubTaskMutationArgs
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: cancelSubTaskUrl(subTaskId),
        method: HttpMethodEnum.Delete,
        data: payload,
      }),
      onQueryStarted: async (
        { subTaskId, taskId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled

          dispatch(
            apiService.util.updateQueryData(
              SubTaskEndpointNameEnum.GetSubTaskList as never,
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
    [SubTaskEndpointNameEnum.ReworkSubTask]: build.mutation<
      ReworkSubTaskSuccessResponse,
      ReworkSubTaskMutationArgs
    >({
      query: ({ taskId, subTaskId, ...payload }) => ({
        url: reworkSubTaskUrl(subTaskId),
        method: HttpMethodEnum.Post,
        data: payload,
      }),
      onQueryStarted: async (
        { subTaskId, taskId },
        { dispatch, queryFulfilled },
      ) => {
        try {
          await queryFulfilled

          dispatch(
            apiService.util.updateQueryData(
              SubTaskEndpointNameEnum.GetSubTaskList as never,
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
  useLazyGetSubTaskTemplateListQuery,
  useCreateSubTaskMutation,
  useCancelSubTaskMutation,
  useReworkSubTaskMutation,
  useGetSubTaskListQuery,
} = subTaskApiService
