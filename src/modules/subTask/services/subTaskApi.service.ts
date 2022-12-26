import {
  CancelSubTaskMutationArgsModel,
  CancelSubTaskResponseModel,
  CreateSubTaskMutationArgsModel,
  CreateSubTaskResponseModel,
  GetSubTaskListQueryArgsModel,
  GetSubTaskListResponseModel,
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
  ReworkSubTaskMutationArgsModel,
  ReworkSubTaskResponseModel,
  SubTaskModel,
} from 'modules/subTask/models'
import {
  getCancelSubTaskUrl,
  getCreateSubTaskUrl,
  getReworkSubTaskUrl,
  getSubTaskListUrl,
  getSubTaskTemplateListUrl,
} from 'modules/subTask/utils/apiUrls'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import { SubTaskEndpointNameEnum } from '../constants/api'

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
        url: getCancelSubTaskUrl(subTaskId),
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
        url: getReworkSubTaskUrl(subTaskId),
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
