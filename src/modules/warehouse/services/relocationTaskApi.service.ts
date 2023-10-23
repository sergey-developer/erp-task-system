import { getPaginatedList } from 'lib/antd/utils'

import {
  RelocationTaskApiEnum,
  RelocationTaskApiTagEnum,
} from 'modules/warehouse/constants/relocationTask'
import {
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListSuccessResponse,
  GetRelocationTaskQueryArgs,
  GetRelocationTaskSuccessResponse,
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse,
  ReturnRelocationTaskToReworkMutationArgs,
  ReturnRelocationTaskToReworkSuccessResponse,
} from 'modules/warehouse/models'
import {
  GetRelocationEquipmentListTransformedSuccessResponse,
  GetRelocationTaskListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  getRelocationEquipmentListUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
  returnRelocationTaskToReworkUrl,
} from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationTaskApiService = baseApiService
  .enhanceEndpoints({ addTagTypes: [RelocationTaskApiTagEnum.RelocationTask] })
  .injectEndpoints({
    endpoints: (build) => ({
      getRelocationTask: build.query<GetRelocationTaskSuccessResponse, GetRelocationTaskQueryArgs>({
        providesTags: (result, error) => (error ? [] : [RelocationTaskApiTagEnum.RelocationTask]),
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      returnRelocationTaskToRework: build.mutation<
        ReturnRelocationTaskToReworkSuccessResponse,
        ReturnRelocationTaskToReworkMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [RelocationTaskApiTagEnum.RelocationTask],
        query: ({ relocationTaskId, ...payload }) => {
          return {
            url: returnRelocationTaskToReworkUrl(relocationTaskId),
            method: HttpMethodEnum.Post,
            data: payload,
          }
        },
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
  useGetRelocationTaskQuery,
  useLazyGetRelocationTaskWaybillM15Query,
  useReturnRelocationTaskToReworkMutation,
  useGetRelocationTaskListQuery,
  useGetRelocationEquipmentListQuery,
} = relocationTaskApiService
