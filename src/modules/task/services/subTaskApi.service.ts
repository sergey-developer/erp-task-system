import { TaskEndpointsEnum } from 'modules/task/constants/api'
import {
  CreateSubTaskMutationArgsModel,
  CreateSubTaskResponseModel,
  GetSubTaskListQueryArgsModel,
  GetSubTaskListResponseModel,
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
} from 'modules/task/features/TaskView/models'
import {
  getCreateSubTaskUrl,
  getSubTaskListUrl,
} from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

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
  }),
  overrideExisting: false,
})

export const {
  useLazyGetSubTaskTemplateListQuery,
  useCreateSubTaskMutation,
  useGetSubTaskListQuery,
} = subTaskApiService
