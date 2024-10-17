import { decamelize } from 'humps'

import {
  InfrastructuresApiEnum,
  InfrastructuresApiTagEnum,
} from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormWorkMutationArgs,
  CreateInfrastructureOrderFormWorkSuccessResponse,
  DeleteInfrastructureOrdersFormsWorkMutationArgs,
  DeleteInfrastructureOrdersFormsWorkSuccessResponse,
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
  CreateInfrastructureOrderFormAttachmentMutationArgs,
  CreateInfrastructureOrderFormAttachmentSuccessResponse,
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse,
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
  GetInfrastructureQueryArgs,
  GetInfrastructureStatusHistoryQueryArgs,
  GetInfrastructureStatusHistorySuccessResponse,
  GetInfrastructureSuccessResponse,
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureOrderFormWorkMutationArgs,
  UpdateInfrastructureOrderFormWorkSuccessResponse,
  UpdateInfrastructureStatusMutationArgs,
  UpdateInfrastructureStatusSuccessResponse,
  UpdateInfrastructureSuccessResponse,
} from 'modules/infrastructures/models'
import {
  makeDeleteInfrastructureOrdersFormsWorkUrl,
  makeGetInfrastructureUrl,
  makeUpdateInfrastructureUrl,
} from 'modules/infrastructures/utils/infrastructure/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

import { makeUpdateInfrastructureOrderFormWorkApiUrl } from '../utils/infrastructureOrderFormWork/apiUrls'

const infrastructuresApiService = baseApiService
  .enhanceEndpoints({
    addTagTypes: [
      InfrastructuresApiTagEnum.Infrastructure,
      InfrastructuresApiTagEnum.InfrastructureOrdersForms,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getInfrastructure: build.query<GetInfrastructureSuccessResponse, GetInfrastructureQueryArgs>({
        providesTags: (result, error) => (error ? [] : [InfrastructuresApiTagEnum.Infrastructure]),
        query: ({ infrastructureId }) => ({
          url: makeGetInfrastructureUrl({ infrastructureId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      updateInfrastructure: build.mutation<
        UpdateInfrastructureSuccessResponse,
        UpdateInfrastructureMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InfrastructuresApiTagEnum.Infrastructure],
        query: ({ infrastructureId, ...data }) => ({
          url: makeUpdateInfrastructureUrl({ infrastructureId }),
          method: HttpMethodEnum.Patch,
          data,
        }),
      }),
      updateInfrastructureStatus: build.mutation<
        UpdateInfrastructureStatusSuccessResponse,
        UpdateInfrastructureStatusMutationArgs
      >({
        query: (data) => ({
          url: InfrastructuresApiEnum.UpdateInfrastructureStatus,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      getInfrastructureStatusHistory: build.query<
        GetInfrastructureStatusHistorySuccessResponse,
        GetInfrastructureStatusHistoryQueryArgs
      >({
        query: (params) => ({
          url: InfrastructuresApiEnum.GetInfrastructureStatusHistory,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      getInfrastructureOrdersForms: build.query<
        GetInfrastructureOrdersFormsSuccessResponse,
        GetInfrastructureOrdersFormsQueryArgs
      >({
        providesTags: (result, error) =>
          error ? [] : [InfrastructuresApiTagEnum.InfrastructureOrdersForms],
        query: (params) => ({
          url: InfrastructuresApiEnum.GetInfrastructureOrdersForms,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      createInfrastructureOrderForm: build.mutation<
        CreateInfrastructureOrderFormSuccessResponse,
        CreateInfrastructureOrderFormMutationArgs
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InfrastructuresApiTagEnum.InfrastructureOrdersForms],
        query: (data) => ({
          url: InfrastructuresApiEnum.CreateInfrastructureOrderForm,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),

      createInfrastructureOrderFormAttachment: build.mutation<
        CreateInfrastructureOrderFormAttachmentSuccessResponse,
        CreateInfrastructureOrderFormAttachmentMutationArgs
      >({
        query: ({ orderFormId, file }) => {
          const formData = new FormData()
          formData.append(decamelize('orderForm'), String(orderFormId))
          formData.append('file', file)

          return {
            url: InfrastructuresApiEnum.CreateInfrastructureOrdersFormAttachment,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      getInfrastructureOrderFormWorkTypeCost: build.query<
        GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
        GetInfrastructureOrderFormWorkTypeCostQueryArgs
      >({
        query: (params) => ({
          url: InfrastructuresApiEnum.GetInfrastructureOrderFormWorkTypeCost,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      createInfrastructureOrderFormWork: build.mutation<
        CreateInfrastructureOrderFormWorkSuccessResponse,
        CreateInfrastructureOrderFormWorkMutationArgs
      >({
        query: (data) => ({
          url: InfrastructuresApiEnum.CreateInfrastructureOrderFormWork,
          method: HttpMethodEnum.Post,
          data: data,
        }),
      }),
      updateInfrastructureOrderFormWork: build.mutation<
        UpdateInfrastructureOrderFormWorkSuccessResponse,
        UpdateInfrastructureOrderFormWorkMutationArgs
      >({
        query: ({ infrastructureWorkId, ...data }) => ({
          url: makeUpdateInfrastructureOrderFormWorkApiUrl(infrastructureWorkId),
          method: HttpMethodEnum.Put,
          data: data,
        }),
      }),

      deleteInfrastructureOrdersFormsWork: build.mutation<
        DeleteInfrastructureOrdersFormsWorkSuccessResponse,
        DeleteInfrastructureOrdersFormsWorkMutationArgs
      >({
        query: ({ infrastructureWorkId }) => ({
          url: makeDeleteInfrastructureOrdersFormsWorkUrl({ infrastructureWorkId }),
          method: HttpMethodEnum.Delete,
        }),
      }),
    }),
    overrideExisting: false,
  })

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,

  useCreateInfrastructureOrderFormMutation,
  useGetInfrastructureOrdersFormsQuery,

  useCreateInfrastructureOrderFormAttachmentMutation,

  useLazyGetInfrastructureOrderFormWorkTypeCostQuery,

  useCreateInfrastructureOrderFormWorkMutation,
  useUpdateInfrastructureOrderFormWorkMutation,
  useDeleteInfrastructureOrdersFormsWorkMutation,

  useUpdateInfrastructureStatusMutation,
  useGetInfrastructureStatusHistoryQuery,
} = infrastructuresApiService
