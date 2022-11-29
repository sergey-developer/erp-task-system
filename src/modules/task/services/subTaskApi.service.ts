import { TaskEndpointsEnum } from 'modules/task/constants/api'
import {
  GetSubTaskTemplateListQueryArgsModel,
  GetSubTaskTemplateListResponseModel,
} from 'modules/task/features/TaskView/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { apiService } from 'shared/services/api'

const subTaskApiService = apiService.injectEndpoints({
  endpoints: (build) => ({
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

export const { useLazyGetSubTaskTemplateListQuery } = subTaskApiService
