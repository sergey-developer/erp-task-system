import { getPaginatedList } from 'lib/antd/utils'

import {
  RelocationTaskApiEnum,
  RelocationTaskApiTagEnum,
  RelocationTaskApiTriggerEnum,
} from 'modules/warehouse/constants/relocationTask'
import {
  CancelRelocationTaskMutationArgs,
  CancelRelocationTaskSuccessResponse,
  CloseRelocationTaskMutationArgs,
  CloseRelocationTaskSuccessResponse,
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
  ReturnRelocationTaskToReworkMutationArgs,
  ReturnRelocationTaskToReworkSuccessResponse,
  UpdateRelocationTaskMutationArgs,
  UpdateRelocationTaskSuccessResponse,
} from 'modules/warehouse/models'
import {
  closeRelocationTaskUrl,
  getRelocationEquipmentBalanceListUrl,
  GetRelocationEquipmentListTransformedSuccessResponse,
  GetRelocationTaskListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  cancelRelocationTaskUrl,
  getRelocationEquipmentListUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
  updateRelocationTaskUrl,
  returnRelocationTaskToReworkUrl,
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
      [RelocationTaskApiTriggerEnum.GetRelocationTask]: build.query<
        GetRelocationTaskSuccessResponse,
        GetRelocationTaskQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [RelocationTaskApiTagEnum.RelocationTask]),
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      closeRelocationTask: build.mutation<
        CloseRelocationTaskSuccessResponse,
        CloseRelocationTaskMutationArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: closeRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApiService.util.updateQueryData(
                RelocationTaskApiTriggerEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskSuccessResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
        },
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
      cancelRelocationTask: build.mutation<
        CancelRelocationTaskSuccessResponse,
        CancelRelocationTaskMutationArgs
        >({
        query: ({ relocationTaskId }) => ({
          url: cancelRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApiService.util.updateQueryData(
                RelocationTaskApiTriggerEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskSuccessResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
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
  useCloseRelocationTaskMutation,
  useReturnRelocationTaskToReworkMutation,
  useCancelRelocationTaskMutation,
  useGetRelocationTaskQuery,

  useLazyGetRelocationTaskWaybillM15Query,

  useGetRelocationTaskListQuery,

  useGetRelocationEquipmentListQuery,
  useGetRelocationEquipmentBalanceListQuery,
} = relocationTaskApiService
