import { getPaginatedList } from 'lib/antd/utils'

import {
  RelocationTaskApiEnum,
  RelocationTaskApiTriggerEnum,
} from 'modules/warehouse/constants/relocationTask'
import {
  CancelRelocationTaskMutationArgs,
  CancelRelocationTaskSuccessResponse,
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
  GetRelocationTaskListQueryArgs,
  GetRelocationTaskListSuccessResponse,
  GetRelocationTaskQueryArgs,
  GetRelocationTaskSuccessResponse,
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse,
} from 'modules/warehouse/models'
import {
  GetRelocationEquipmentListTransformedSuccessResponse,
  GetRelocationTaskListTransformedSuccessResponse,
} from 'modules/warehouse/types'
import {
  cancelRelocationTaskUrl,
  getRelocationEquipmentListUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
} from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const relocationTaskApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    [RelocationTaskApiTriggerEnum.GetRelocationTask]: build.query<
      GetRelocationTaskSuccessResponse,
      GetRelocationTaskQueryArgs
    >({
      query: ({ relocationTaskId }) => ({
        url: getRelocationTaskUrl(relocationTaskId),
        method: HttpMethodEnum.Get,
      }),
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
  useCancelRelocationTaskMutation,
  useLazyGetRelocationTaskWaybillM15Query,
  useGetRelocationTaskListQuery,
  useGetRelocationEquipmentListQuery,
} = relocationTaskApiService
