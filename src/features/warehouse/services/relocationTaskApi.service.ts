import { RelocationEquipmentApiTagEnum } from 'features/warehouse/constants/relocationEquipment'
import {
  RelocationTaskApiEnum,
  RelocationTaskApiTagEnum,
  RelocationTaskApiTriggerEnum,
} from 'features/warehouse/constants/relocationTask'
import {
  CancelRelocationTaskMutationArgs,
  CancelRelocationTaskSuccessResponse,
  CloseRelocationTaskMutationArgs,
  CloseRelocationTaskSuccessResponse,
  CreateRelocationTaskAttachmentMutationArgs,
  CreateRelocationTaskAttachmentSuccessResponse,
  CreateRelocationTaskCompletionDocumentsMutationArgs,
  CreateRelocationTaskCompletionDocumentsSuccessResponse,
  CreateRelocationTaskITSMMutationArgs,
  CreateRelocationTaskITSMSuccessResponse,
  CreateRelocationTaskMutationArgs,
  CreateRelocationTaskSuccessResponse,
  ExecuteRelocationTaskMutationArgs,
  ExecuteRelocationTaskSuccessResponse,
  GetRelocationEquipmentBalanceListQueryArgs,
  GetRelocationEquipmentBalanceListSuccessResponse,
  GetRelocationEquipmentListQueryArgs,
  GetRelocationEquipmentListSuccessResponse,
  GetRelocationTaskAttachmentsQueryArgs,
  GetRelocationTaskAttachmentsSuccessResponse,
  GetRelocationTaskCompletionDocumentsQueryArgs,
  GetRelocationTaskCompletionDocumentsSuccessResponse,
  GetRelocationTaskQueryArgs,
  GetRelocationTasksQueryArgs,
  GetRelocationTasksSuccessResponse,
  GetRelocationTaskSuccessResponse,
  GetRelocationTaskWaybillM15QueryArgs,
  GetRelocationTaskWaybillM15SuccessResponse,
  MoveRelocationTaskDraftToWorkMutationArgs,
  MoveRelocationTaskDraftToWorkSuccessResponse,
  ReturnRelocationTaskToReworkMutationArgs,
  ReturnRelocationTaskToReworkSuccessResponse,
  UpdateExternalRelocationMutationArgs,
  UpdateExternalRelocationSuccessResponse,
  UpdateRelocationTaskMutationArgs,
  UpdateRelocationTaskSuccessResponse,
} from 'features/warehouse/models'
import { GetRelocationTasksTransformedSuccessResponse } from 'features/warehouse/types'
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
        CreateRelocationTaskSuccessResponse,
        CreateRelocationTaskMutationArgs
      >({
        query: (payload) => ({
          url: RelocationTaskApiEnum.CreateRelocationTask,
          method: HttpMethodEnum.Post,
          data: payload,
        }),
      }),
      createRelocationTaskITSM: build.mutation<
        CreateRelocationTaskITSMSuccessResponse,
        CreateRelocationTaskITSMMutationArgs
      >({
        query: (payload) => ({
          url: RelocationTaskApiEnum.CreateRelocationTaskITSM,
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
                RelocationEquipmentApiTagEnum.RelocationEquipmentAttachmentList,
              ],
        query: ({ relocationTaskId, ...payload }) => ({
          url: updateRelocationTaskUrl(relocationTaskId),
          method: HttpMethodEnum.Put,
          data: payload,
        }),
      }),
      executeRelocationTask: build.mutation<
        ExecuteRelocationTaskSuccessResponse,
        ExecuteRelocationTaskMutationArgs
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
              baseApi.util.updateQueryData(
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
      [RelocationTaskApiTriggerEnum.GetRelocationTask]: build.query<
        GetRelocationTaskSuccessResponse,
        GetRelocationTaskQueryArgs
      >({
        providesTags: (result, error) => (error ? [] : [RelocationTaskApiTagEnum.RelocationTask]),
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskUrl({ relocationTaskId }),
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
              baseApi.util.updateQueryData(
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

      getRelocationTaskAttachments: build.query<
        GetRelocationTaskAttachmentsSuccessResponse,
        GetRelocationTaskAttachmentsQueryArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskAttachmentsUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createRelocationTaskAttachment: build.mutation<
        CreateRelocationTaskAttachmentSuccessResponse,
        CreateRelocationTaskAttachmentMutationArgs
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
        UpdateExternalRelocationSuccessResponse,
        UpdateExternalRelocationMutationArgs
      >({
        query: ({ relocationTaskId, ...data }) => ({
          url: updateExternalRelocationUrl(relocationTaskId),
          method: HttpMethodEnum.Patch,
          data,
        }),
      }),

      [RelocationTaskApiTriggerEnum.GetRelocationTasks]: build.query<
        GetRelocationTasksTransformedSuccessResponse,
        GetRelocationTasksQueryArgs
      >({
        query: (params) => ({
          url: RelocationTaskApiEnum.GetRelocationTasks,
          method: HttpMethodEnum.Get,
          params,
        }),
        transformResponse: (response: GetRelocationTasksSuccessResponse, meta, arg) =>
          getPaginatedList(response, arg),
      }),

      getRelocationEquipmentList: build.query<
        GetRelocationEquipmentListSuccessResponse,
        GetRelocationEquipmentListQueryArgs
      >({
        providesTags: (result, error) =>
          error ? [] : [RelocationTaskApiTagEnum.RelocationEquipmentList],
        query: ({ relocationTaskId }) => ({
          url: getRelocationEquipmentListUrl({ relocationTaskId }),
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

      getRelocationTaskCompletionDocuments: build.query<
        GetRelocationTaskCompletionDocumentsSuccessResponse,
        GetRelocationTaskCompletionDocumentsQueryArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: getRelocationTaskCompletionDocumentsUrl(relocationTaskId),
          method: HttpMethodEnum.Get,
        }),
      }),
      createRelocationTaskCompletionDocuments: build.mutation<
        CreateRelocationTaskCompletionDocumentsSuccessResponse,
        CreateRelocationTaskCompletionDocumentsMutationArgs
      >({
        query: ({ relocationTaskId }) => ({
          url: createRelocationTaskCompletionDocumentsUrl(relocationTaskId),
          method: HttpMethodEnum.Post,
        }),
      }),

      moveRelocationTaskDraftToWork: build.mutation<
        MoveRelocationTaskDraftToWorkSuccessResponse,
        MoveRelocationTaskDraftToWorkMutationArgs
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
                (task: GetRelocationTaskSuccessResponse) => {
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
