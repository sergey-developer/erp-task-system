import { TaskEndpointsEnum } from 'modules/task/constants/api'
import {
  deleteSubTaskUrl,
  getCreateSubTaskUrl,
  getSubTaskListUrl,
  reworkSubTaskUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

import {
  CreateSubTaskMutationArgsModel,
  CreateSubTaskResponseModel,
  DeleteSubTaskMutationArgsModel,
  DeleteSubTaskResponseModel,
  GetSubTaskListQueryArgsModel,
  GetSubTaskListResponseModel,
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
  ReworkSubTaskMutationArgsModel,
  ReworkSubTaskResponseModel,
} from '../features/TaskView/models'

const subTaskApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
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
              (subTaskList: any[]) => {
                subTaskList.unshift(newSubTask)
              },
            ),
          )
        } catch {}
      },
    }),
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
        url: TaskEndpointsEnum.GetSubTaskTemplateList,
        method: HttpMethodEnum.Get,
      }),
    }),
    deleteSubTask: build.mutation<
      DeleteSubTaskResponseModel,
      DeleteSubTaskMutationArgsModel
    >({
      query: ({ taskId, ...payload }) => ({
        url: deleteSubTaskUrl(taskId),
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
  useDeleteSubTaskMutation,
  useReworkSubTaskMutation,
  useGetSubTaskListQuery,
} = subTaskApiService
