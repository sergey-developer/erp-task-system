import { decamelizeKeys } from 'humps'

import { getPaginatedList } from 'lib/antd/utils'

import { RelocationEquipmentApiTagEnum } from 'modules/warehouse/constants/relocationEquipment'
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
  CreateRelocationTaskAttachmentMutationArgs,
  CreateRelocationTaskAttachmentSuccessResponse,
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
import { GetRelocationTaskListTransformedSuccessResponse } from 'modules/warehouse/types'
import {
  cancelRelocationTaskUrl,
  closeRelocationTaskUrl,
  createRelocationTaskAttachmentUrl,
  executeRelocationTaskUrl,
  getRelocationEquipmentBalanceListUrl,
  getRelocationEquipmentListUrl,
  getRelocationTaskAttachmentsUrl,
  getRelocationTaskUrl,
  getRelocationTaskWaybillM15Url,
  returnRelocationTaskToReworkUrl,
  updateRelocationTaskUrl,
} from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

const getFormData = (model: any, form: FormData = new FormData(), namespace = ''): FormData => {
  let formData = form || new FormData()

  for (let propertyName in model) {
    if (!model.hasOwnProperty(propertyName) || !model[propertyName]) continue
    let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName
    if (model[propertyName] instanceof Date)
      formData.append(formKey, model[propertyName].toISOString())
    else if (model[propertyName] instanceof Array) {
      model[propertyName].forEach((element: any, index: number) => {
        if (typeof element.name == 'string') {
          formData.append(formKey, element)
        } else {
          const tempFormKey = `${formKey}[${index}]`
          getFormData(element, formData, tempFormKey)
        }
      })
    } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
      getFormData(model[propertyName], formData, formKey)
    } else {
      formData.append(formKey, model[propertyName].toString())
    }
  }
  return formData
}

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
        query: (payload) => {
          const formData = new FormData()
          // payload.relocateFromId
          // payload.type
          // payload.deadlineAt
          // payload.executor
          // payload.equipments

          if (payload.relocateToId) formData.append('relocateToId', String(payload.relocateToId))
          if (payload.comment) formData.append('comment', payload.comment)

          if (payload.images?.length) {
            payload.images.forEach((img) => {
              formData.append('images', img)
            })
          }

          return {
            url: RelocationTaskApiEnum.CreateRelocationTask,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),
      createRelocationTaskITSM: build.mutation<
        CreateRelocationTaskITSMSuccessResponse,
        CreateRelocationTaskITSMMutationArgs
      >({
        query: (payload) => {
          const data = getFormData(decamelizeKeys(payload))
          return {
            url: RelocationTaskApiEnum.CreateRelocationTaskITSM,
            method: HttpMethodEnum.Post,
            data,
          }
        },
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
  useCreateRelocationTaskITSMMutation,
  useUpdateRelocationTaskMutation,
  useCloseRelocationTaskMutation,
  useGetRelocationTaskQuery,
  useExecuteRelocationTaskMutation,
  useReturnRelocationTaskToReworkMutation,
  useCancelRelocationTaskMutation,
  useCreateRelocationTaskAttachmentMutation,
  useGetRelocationTaskAttachmentsQuery,
  useLazyGetRelocationTaskWaybillM15Query,

  useGetRelocationTaskListQuery,

  useGetRelocationEquipmentListQuery,
  useGetRelocationEquipmentBalanceListQuery,
} = relocationTaskApiService
