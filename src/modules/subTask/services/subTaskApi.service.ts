import {
  GetSubTaskListQueryArgsModel,
  GetSubTaskListResponseModel,
  SubTaskModel,
} from 'modules/subTask/models'
import {
  cancelSubTaskUrl,
  getCreateSubTaskUrl,
  getSubTaskListUrl,
  getSubTaskTemplateListUrl,
  reworkSubTaskUrl,
} from 'modules/subTask/utils/apiUrls'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import { SubTaskEndpointNameEnum } from '../constants/api'
import {
  CancelSubTaskMutationArgsModel,
  CancelSubTaskResponseModel,
  CreateSubTaskMutationArgsModel,
  CreateSubTaskResponseModel,
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
  ReworkSubTaskMutationArgsModel,
  ReworkSubTaskResponseModel,
} from '../models'

const subTaskApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
    [SubTaskEndpointNameEnum.GetSubTaskList]: build.query<
      GetSubTaskListResponseModel,
      GetSubTaskListQueryArgsModel
    >({
      query: (taskId) => ({
        url: getSubTaskListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    [SubTaskEndpointNameEnum.GetSubTaskTemplateList]: build.query<
      GetSubTaskTemplateListResponseModel,
      GetSubTaskTemplateListQueryArgsModel
    >({
      query: () => ({
        url: getSubTaskTemplateListUrl(),
        method: HttpMethodEnum.Get,
      }),
    }),
    [SubTaskEndpointNameEnum.CreateSubTask]: build.mutation<
      CreateSubTaskResponseModel,
      CreateSubTaskMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getCreateSubTaskUrl(taskId),
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
      CancelSubTaskResponseModel,
      CancelSubTaskMutationArgsModel
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
                  subTask.status = TaskStatusEnum.Completed
                }
              },
            ),
          )
        } catch {}
      },
    }),
    [SubTaskEndpointNameEnum.ReworkSubTask]: build.mutation<
      ReworkSubTaskResponseModel,
      ReworkSubTaskMutationArgsModel
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
