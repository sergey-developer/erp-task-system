import { getPaginatedList } from 'lib/antd/utils'

import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListSuccessResponse,
  GetRelocationTaskQueryArgs,
  GetRelocationTaskSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetRelocationEquipmentListTransformedSuccessResponse,
  GetRelocationTaskListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  getRelocationEquipmentListUrl,
  getRelocationTaskUrl,
} from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationTaskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getRelocationTask: build.query<GetRelocationTaskSuccessResponse, GetRelocationTaskQueryArgs>({
      query: ({ relocationTaskId }) => ({
        url: getRelocationTaskUrl(relocationTaskId),
        method: HttpMethodEnum.Get,
      }),
    }),
    getRelocationTaskList: build.query<
      GetRelocationTaskListTransformedSuccessResponse,
      GetRelocationTaskListQueryArgs
    >({
      query: (params) => ({
        url: RelocationTaskApiEnum.GetRelocationTaskList,
        method: HttpMethodEnum.Get,
        params,
      }),
      transformResponse: (response: GetRelocationTaskListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),

    getRelocationEquipmentList: build.query<
      GetRelocationEquipmentListTransformedSuccessResponse,
      GetRelocationEquipmentListQueryArgs
    >({
      query: ({ relocationTaskId }) => ({
        url: getRelocationEquipmentListUrl(relocationTaskId),
        method: HttpMethodEnum.Get,
      }),
      transformResponse: (response: GetRelocationEquipmentListSuccessResponse, meta, arg) =>
        getPaginatedList(response, arg),
    }),
  }),
})

export const {
  useGetRelocationTaskListQuery,
  useGetRelocationTaskQuery,
  useGetRelocationEquipmentListQuery,
} = relocationTaskApiService
