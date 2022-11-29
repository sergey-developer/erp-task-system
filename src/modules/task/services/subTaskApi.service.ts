import { TaskEndpointsEnum } from 'modules/task/constants/api'
import {
  CreateSubTaskMutationArgsModel,
  CreateSubTaskResponseModel,
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
} from 'modules/task/features/TaskView/models'
import { getCreateSubTaskUrl } from 'modules/task/utils/apiUrls'
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

export const { useLazyGetSubTaskTemplateListQuery, useCreateSubTaskMutation } =
  subTaskApiService
