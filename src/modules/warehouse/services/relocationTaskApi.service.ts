import { getPaginatedList } from 'lib/antd/utils'

import {
  RelocationTaskApiEnum,
  RelocationTaskApiTagEnum,
} from 'modules/warehouse/constants/relocationTask'
import {
  CreateRelocationTaskMutationArgs,
  CreateRelocationTaskSuccessResponse,
  GetRelocationEquipmentBalanceListQueryArgs,
  GetRelocationEquipmentBalanceListSuccessResponse,
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListSuccessResponse,
  GetRelocationTaskQueryArgs,
  GetRelocationTaskSuccessResponse,
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse,
  UpdateRelocationTaskMutationArgs,
  UpdateRelocationTaskSuccessResponse,
} from 'modules/warehouse/models'
import { GetRelocationTaskListTransformedSuccessResponse } from 'modules/warehouse/types'
import {
  getRelocationEquipmentBalanceListUrl,
  getRelocationEquipmentListUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
  updateRelocationTaskUrl,
} from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationTaskApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [
      RelocationTaskApiTagEnum.RelocationEquipmentList,
      RelocationTaskApiTagEnum.RelocationTask,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createRelocationTask: build.mutation<
        CreateRelocationTaskSuccessResponse,
        CreateRelocationTaskMutationArgs
      >({
        query: (payload) => ({
          url: RelocationTaskApiEnum.CreateRelocationTask,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      updateRelocationTask: build.mutation<
        UpdateRelocationTaskSuccessResponse,
        UpdateRelocationTaskMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                RelocationTaskApiTagEnum.RelocationEquipmentList,
                RelocationTaskApiTagEnum.RelocationTask,
              ],
        query: ({ relocationTaskId, ...payload }) => ({
          url: updateRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),
      getRelocationTask: build.query<GetRelocationTaskSuccessResponse, GetRelocationTaskQueryArgs>({
        providesTags: (result, error) => (error ? [] : [RelocationTaskApiTagEnum.RelocationTask]),
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
        GetRelocationEquipmentListSuccessResponse,
        GetRelocationEquipmentListQueryArgs
      >({
        providesTags: (result, error) =>
          error ? [] : [RelocationTaskApiTagEnum.RelocationEquipmentList],
        query: ({ relocationTaskId }) => ({
          url: getRelocationEquipmentListUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      getRelocationEquipmentBalanceList: build.query<
        GetRelocationEquipmentBalanceListSuccessResponse,
        GetRelocationEquipmentBalanceListQueryArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationEquipmentBalanceListUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationTaskWaybillM15: build.query<
        GetRelocationTaskWaybillM15SuccessResponse,
        GetRelocationTaskWaybillM15QueryArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskWaybillM15Url(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
    }),
  })

export const {
  useCreateRelocationTaskMutation,
  useUpdateRelocationTaskMutation,
  useGetRelocationTaskQuery,

  useLazyGetRelocationTaskWaybillM15Query,

  useGetRelocationTaskListQuery,

  useGetRelocationEquipmentListQuery,
  useGetRelocationEquipmentBalanceListQuery,
} = relocationTaskApiService
