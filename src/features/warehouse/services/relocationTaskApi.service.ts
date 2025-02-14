import { RelocationEquipmentApiTagEnum } from 'features/warehouse/constants/relocationEquipment'
import {
  RelocationTaskApiEnum,
  RelocationTaskApiTagEnum,
  RelocationTaskApiTriggerEnum,
} from 'features/warehouse/constants/relocationTask'
import {
  CancelRelocationTaskRequest,
  CancelRelocationTaskResponse,
  CloseRelocationTaskRequest,
  CloseRelocationTaskResponse,
  CreateRelocationTaskAttachmentRequest,
  CreateRelocationTaskAttachmentResponse,
  CreateRelocationTaskCompletionDocumentsRequest,
  CreateRelocationTaskCompletionDocumentsResponse,
  CreateRelocationTaskITSMRequest,
  CreateRelocationTaskITSMResponse,
  CreateRelocationTaskRequest,
  CreateRelocationTaskResponse,
  ExecuteRelocationTaskRequest,
  ExecuteRelocationTaskResponse,
  GetRelocationEquipmentBalanceListRequest,
  GetRelocationEquipmentBalanceListResponse,
  GetRelocationEquipmentListRequest,
  GetRelocationEquipmentListResponse,
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse,
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse,
  GetRelocationTaskRequest,
  GetRelocationTasksRequest,
  GetRelocationTasksResponse,
  GetRelocationTaskResponse,
  GetRelocationTaskWaybillM15Request,
  GetRelocationTaskWaybillM15Response,
  MoveRelocationTaskDraftToWorkRequest,
  MoveRelocationTaskDraftToWorkResponse,
  ReturnRelocationTaskToReworkRequest,
  ReturnRelocationTaskToReworkResponse,
  UpdateExternalRelocationRequest,
  UpdateExternalRelocationResponse,
  UpdateRelocationTaskRequest,
  UpdateRelocationTaskResponse,
} from 'features/warehouse/models'
import { GetRelocationTasksTransformedResponse } from 'features/warehouse/types'
import {
  cancelRelocationTaskUrl,
  closeRelocationTaskUrl,
  createRelocationTaskAttachmentUrl,
  createRelocationTaskCompletionDocumentsUrl,
  executeRelocationTaskUrl,
  getRelocationEquipmentBalanceListUrl,
  getRelocationEquipmentListUrl,
  getRelocationTaskAttachmentsUrl,
  getRelocationTaskCompletionDocumentsUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
  makeMoveRelocationTaskDraftToWorkApiUrl,
  returnRelocationTaskToReworkUrl,
  updateExternalRelocationUrl,
  updateRelocationTaskUrl,
} from 'features/warehouse/utils/relocationTask'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const relocationTaskApiService = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      RelocationTaskApiTagEnum.RelocationEquipmentList,
      RelocationTaskApiTagEnum.RelocationTask,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createRelocationTask: build.mutation<
        CreateRelocationTaskResponse,
        CreateRelocationTaskRequest
      >({
        query: (payload) => ({
          url: RelocationTaskApiEnum.CreateRelocationTask,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      createRelocationTaskITSM: build.mutation<
        CreateRelocationTaskITSMResponse,
        CreateRelocationTaskITSMRequest
      >({
        query: (payload) => ({
          url: RelocationTaskApiEnum.CreateRelocationTaskITSM,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      updateRelocationTask: build.mutation<
        UpdateRelocationTaskResponse,
        UpdateRelocationTaskRequest
      >({
        invalidatesTags: (result, error) =>
          error
            ? []
            : [
                RelocationTaskApiTagEnum.RelocationEquipmentList,
                RelocationTaskApiTagEnum.RelocationTask,
                RelocationEquipmentApiTagEnum.RelocationEquipmentAttachmentList,
              ],
        query: ({ relocationTaskId, ...payload }) => ({
          url: updateRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),
      executeRelocationTask: build.mutation<
        ExecuteRelocationTaskResponse,
        ExecuteRelocationTaskRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [RelocationTaskApiTagEnum.RelocationTask],
        query: ({ relocationTaskId, documents }) => {
          const formData = new FormData()

          if (documents.length) {
            documents.forEach((doc) => {
              formData.append('documents', doc)
            })
          }

          return {
            url: executeRelocationTaskUrl(relocationTaskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),
      returnRelocationTaskToRework: build.mutation<
        ReturnRelocationTaskToReworkResponse,
        ReturnRelocationTaskToReworkRequest
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
        CancelRelocationTaskResponse,
        CancelRelocationTaskRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: cancelRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTaskApiTriggerEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
        },
      }),
      [RelocationTaskApiTriggerEnum.GetRelocationTask]: build.query<
        GetRelocationTaskResponse,
        GetRelocationTaskRequest
      >({
        providesTags: (result, error) => (error ? [] : [RelocationTaskApiTagEnum.RelocationTask]),
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskUrl({ relocationTaskId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      closeRelocationTask: build.mutation<
        CloseRelocationTaskResponse,
        CloseRelocationTaskRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: closeRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTaskApiTriggerEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
        },
      }),

      getRelocationTaskAttachments: build.query<
        GetRelocationTaskAttachmentsResponse,
        GetRelocationTaskAttachmentsRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskAttachmentsUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createRelocationTaskAttachment: build.mutation<
        CreateRelocationTaskAttachmentResponse,
        CreateRelocationTaskAttachmentRequest
      >({
        query: ({ relocationTaskId, file }) => {
          const formData = new FormData()
          formData.append('file', file)

          return {
            url: createRelocationTaskAttachmentUrl(relocationTaskId),
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      updateExternalRelocation: build.mutation<
        UpdateExternalRelocationResponse,
        UpdateExternalRelocationRequest
      >({
        query: ({ relocationTaskId, ...data }) => ({
          url: updateExternalRelocationUrl(relocationTaskId),
          method: HttpMethodEnum.Patch,
          data,
        }),
      }),

      [RelocationTaskApiTriggerEnum.GetRelocationTasks]: build.query<
        GetRelocationTasksTransformedResponse,
        GetRelocationTasksRequest
      >({
        query: (params) => ({
          url: RelocationTaskApiEnum.GetRelocationTasks,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetRelocationTasksResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getRelocationEquipmentList: build.query<
        GetRelocationEquipmentListResponse,
        GetRelocationEquipmentListRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [RelocationTaskApiTagEnum.RelocationEquipmentList],
        query: ({ relocationTaskId }) => ({
          url: getRelocationEquipmentListUrl({ relocationTaskId }),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationEquipmentBalanceList: build.query<
        GetRelocationEquipmentBalanceListResponse,
        GetRelocationEquipmentBalanceListRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationEquipmentBalanceListUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationTaskWaybillM15: build.query<
        GetRelocationTaskWaybillM15Response,
        GetRelocationTaskWaybillM15Request
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskWaybillM15Url(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationTaskCompletionDocuments: build.query<
        GetRelocationTaskCompletionDocumentsResponse,
        GetRelocationTaskCompletionDocumentsRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskCompletionDocumentsUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createRelocationTaskCompletionDocuments: build.mutation<
        CreateRelocationTaskCompletionDocumentsResponse,
        CreateRelocationTaskCompletionDocumentsRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: createRelocationTaskCompletionDocumentsUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      moveRelocationTaskDraftToWork: build.mutation<
        MoveRelocationTaskDraftToWorkResponse,
        MoveRelocationTaskDraftToWorkRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: makeMoveRelocationTaskDraftToWorkApiUrl({ relocationTaskId }),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTaskApiTriggerEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
        },
      }),
    }),
  })

export const {
  useCreateRelocationTaskMutation,
  useCreateRelocationTaskITSMMutation,
  useUpdateRelocationTaskMutation,
  useCloseRelocationTaskMutation,
  useGetRelocationTaskQuery,
  useExecuteRelocationTaskMutation,
  useReturnRelocationTaskToReworkMutation,
  useCancelRelocationTaskMutation,

  useUpdateExternalRelocationMutation,

  useCreateRelocationTaskAttachmentMutation,
  useGetRelocationTaskAttachmentsQuery,

  useGetRelocationTaskCompletionDocumentsQuery,
  useCreateRelocationTaskCompletionDocumentsMutation,

  useLazyGetRelocationTaskWaybillM15Query,

  useGetRelocationTasksQuery,

  useGetRelocationEquipmentListQuery,
  useGetRelocationEquipmentBalanceListQuery,

  useMoveRelocationTaskDraftToWorkMutation,
} = relocationTaskApiService
