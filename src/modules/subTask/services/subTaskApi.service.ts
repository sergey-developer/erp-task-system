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
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

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
    getSubTaskList: build.query<
      GetSubTaskListResponseModel,
      GetSubTaskListQueryArgsModel
    >({
      query: (taskId) => ({
        url: getSubTaskListUrl(taskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getSubTaskTemplateList: build.query<
      GetSubTaskTemplateListResponseModel,
      GetSubTaskTemplateListQueryArgsModel
    >({
      query: () => ({
        url: getSubTaskTemplateListUrl(),
        method: HttpMethodEnum.Get,
      }),
    }),
    createSubTask: build.mutation<
      CreateSubTaskResponseModel,
      CreateSubTaskMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: getCreateSubTaskUrl(taskId),
        method: HttpMethodEnum.Post,
        body: payload,
      }),
      onQueryStarted: async ({ taskId }, { dispatch, queryFulfilled }) => {
        try {
          const { data: newSubTask } = await queryFulfilled

          dispatch(
            apiService.util.updateQueryData(
              'getSubTaskList' as never,
              taskId as never,
              (subTaskList: SubTaskModel[]) => {
                subTaskList.unshift(newSubTask)
              },
            ),
          )
        } catch {}
      },
    }),
    cancelSubTask: build.mutation<
      CancelSubTaskResponseModel,
      CancelSubTaskMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: cancelSubTaskUrl(taskId),
        method: HttpMethodEnum.Delete,
        body: payload,
      }),
    }),
    reworkSubTask: build.mutation<
      ReworkSubTaskResponseModel,
      ReworkSubTaskMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: reworkSubTaskUrl(taskId),
        method: HttpMethodEnum.Post,
        body: payload,
      }),
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
