import { RelocationEquipmentsEndpointsTagsEnum } from 'features/relocationEquipments/api/constants'

import { getPaginatedList } from 'lib/antd/utils'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  RelocationTasksApiPathsEnum,
  RelocationTasksEndpointsNamesEnum,
  RelocationTasksEndpointsTagsEnum,
} from '../constants'
import {
  makeCancelRelocationTaskApiPath,
  makeCloseRelocationTaskApiPath,
  makeCreateRelocationTaskAttachmentApiPath,
  makeCreateRelocationTaskCompletionDocumentsApiPath,
  makeExecuteRelocationTaskApiPath,
  makeGetRelocationEquipmentBalancesApiPath,
  makeGetRelocationEquipmentsApiPath,
  makeGetRelocationTaskApiPath,
  makeGetRelocationTaskAttachmentsApiPath,
  makeGetRelocationTaskCompletionDocumentsApiPath,
  makeGetRelocationTaskWaybillM15ApiPath,
  makeMoveRelocationTaskDraftToWorkApiPath,
  makeReturnRelocationTaskToReworkApiPath,
  makeUpdateExternalRelocationApiPath,
  makeUpdateRelocationTaskApiPath,
} from '../helpers'
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
  GetRelocationEquipmentBalancesRequest,
  GetRelocationEquipmentBalancesResponse,
  GetRelocationEquipmentsRequest,
  GetRelocationEquipmentsResponse,
  GetRelocationTaskAttachmentsRequest,
  GetRelocationTaskAttachmentsResponse,
  GetRelocationTaskCompletionDocumentsRequest,
  GetRelocationTaskCompletionDocumentsResponse,
  GetRelocationTaskRequest,
  GetRelocationTaskResponse,
  GetRelocationTasksRequest,
  GetRelocationTasksResponse,
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
} from '../schemas'
import { GetRelocationTasksTransformedResponse } from '../types'

const relocationTasksEndpoints = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      RelocationTasksEndpointsTagsEnum.RelocationEquipmentList,
      RelocationTasksEndpointsTagsEnum.RelocationTask,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createRelocationTask: build.mutation<
        CreateRelocationTaskResponse,
        CreateRelocationTaskRequest
      >({
        query: (payload) => ({
          url: RelocationTasksApiPathsEnum.CreateRelocationTask,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      createRelocationTaskITSM: build.mutation<
        CreateRelocationTaskITSMResponse,
        CreateRelocationTaskITSMRequest
      >({
        query: (payload) => ({
          url: RelocationTasksApiPathsEnum.CreateRelocationTaskITSM,
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
                RelocationTasksEndpointsTagsEnum.RelocationEquipmentList,
                RelocationTasksEndpointsTagsEnum.RelocationTask,
                RelocationEquipmentsEndpointsTagsEnum.RelocationEquipmentAttachments,
              ],
        query: ({ relocationTaskId, ...payload }) => ({
          url: makeUpdateRelocationTaskApiPath(relocationTaskId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),
      executeRelocationTask: build.mutation<
        ExecuteRelocationTaskResponse,
        ExecuteRelocationTaskRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [RelocationTasksEndpointsTagsEnum.RelocationTask],
        query: ({ relocationTaskId, documents }) => {
          const formData = new FormData()

          if (documents.length) {
            documents.forEach((doc) => {
              formData.append('documents', doc)
            })
          }

          return {
            url: makeExecuteRelocationTaskApiPath(relocationTaskId),
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
          error ? [] : [RelocationTasksEndpointsTagsEnum.RelocationTask],
        query: ({ relocationTaskId, ...payload }) => {
          return {
            url: makeReturnRelocationTaskToReworkApiPath(relocationTaskId),
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
          url: makeCancelRelocationTaskApiPath(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTasksEndpointsNamesEnum.GetRelocationTask as never,
                { relocationTaskId } as never,
                (task: GetRelocationTaskResponse) => {
                  Object.assign(task, { status: data.status })
                },
              ),
            )
          } catch {}
        },
      }),
      [RelocationTasksEndpointsNamesEnum.GetRelocationTask]: build.query<
        GetRelocationTaskResponse,
        GetRelocationTaskRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [RelocationTasksEndpointsTagsEnum.RelocationTask],
        query: ({ relocationTaskId }) => ({
          url: makeGetRelocationTaskApiPath({ relocationTaskId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      closeRelocationTask: build.mutation<CloseRelocationTaskResponse, CloseRelocationTaskRequest>({
        query: ({ relocationTaskId }) => ({
          url: makeCloseRelocationTaskApiPath(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTasksEndpointsNamesEnum.GetRelocationTask as never,
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
          url: makeGetRelocationTaskAttachmentsApiPath(relocationTaskId),
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
            url: makeCreateRelocationTaskAttachmentApiPath(relocationTaskId),
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
          url: makeUpdateExternalRelocationApiPath(relocationTaskId),
          method: HttpMethodEnum.Patch,
          data,
        }),
      }),

      [RelocationTasksEndpointsNamesEnum.GetRelocationTasks]: build.query<
        GetRelocationTasksTransformedResponse,
        GetRelocationTasksRequest
      >({
        query: (params) => ({
          url: RelocationTasksApiPathsEnum.GetRelocationTasks,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetRelocationTasksResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getRelocationEquipments: build.query<
        GetRelocationEquipmentsResponse,
        GetRelocationEquipmentsRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [RelocationTasksEndpointsTagsEnum.RelocationEquipmentList],
        query: ({ relocationTaskId }) => ({
          url: makeGetRelocationEquipmentsApiPath({ relocationTaskId }),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationEquipmentBalances: build.query<
        GetRelocationEquipmentBalancesResponse,
        GetRelocationEquipmentBalancesRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: makeGetRelocationEquipmentBalancesApiPath(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationTaskWaybillM15: build.query<
        GetRelocationTaskWaybillM15Response,
        GetRelocationTaskWaybillM15Request
      >({
        query: ({ relocationTaskId }) => ({
          url: makeGetRelocationTaskWaybillM15ApiPath(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),

      getRelocationTaskCompletionDocuments: build.query<
        GetRelocationTaskCompletionDocumentsResponse,
        GetRelocationTaskCompletionDocumentsRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: makeGetRelocationTaskCompletionDocumentsApiPath(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createRelocationTaskCompletionDocuments: build.mutation<
        CreateRelocationTaskCompletionDocumentsResponse,
        CreateRelocationTaskCompletionDocumentsRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: makeCreateRelocationTaskCompletionDocumentsApiPath(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      moveRelocationTaskDraftToWork: build.mutation<
        MoveRelocationTaskDraftToWorkResponse,
        MoveRelocationTaskDraftToWorkRequest
      >({
        query: ({ relocationTaskId }) => ({
          url: makeMoveRelocationTaskDraftToWorkApiPath({ relocationTaskId }),
          method: HttpMethodEnum.Post,
        }),
        onQueryStarted: async ({ relocationTaskId }, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled

            dispatch(
              baseApi.util.updateQueryData(
                RelocationTasksEndpointsNamesEnum.GetRelocationTask as never,
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

  useGetRelocationEquipmentsQuery,
  useGetRelocationEquipmentBalancesQuery,

  useMoveRelocationTaskDraftToWorkMutation,
} = relocationTasksEndpoints
