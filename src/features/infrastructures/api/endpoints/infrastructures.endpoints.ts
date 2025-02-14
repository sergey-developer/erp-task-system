import {
  InfrastructuresEndpointsEnum,
  InfrastructuresEndpointsTagsEnum,
} from 'features/infrastructures/api/constants'
import {
  makeDeleteInfrastructureOrdersFormsWorkEndpoint,
  makeGetInfrastructureEndpoint,
  makeUpdateInfrastructureEndpoint,
  makeUpdateInfrastructureOrderFormWorkEndpoint,
} from 'features/infrastructures/api/helpers'
import {
  CreateInfrastructureOrderFormAttachmentRequest,
  CreateInfrastructureOrderFormAttachmentResponse,
  CreateInfrastructureOrderFormRequest,
  CreateInfrastructureOrderFormResponse,
  CreateInfrastructureOrderFormWorkRequest,
  CreateInfrastructureOrderFormWorkResponse,
  DeleteInfrastructureOrdersFormsWorkRequest,
  DeleteInfrastructureOrdersFormsWorkResponse,
  GetInfrastructureOrderFormWorkTypeCostRequest,
  GetInfrastructureOrderFormWorkTypeCostResponse,
  GetInfrastructureOrdersFormsRequest,
  GetInfrastructureOrdersFormsResponse,
  GetInfrastructureRequest,
  GetInfrastructureStatusHistoryRequest,
  GetInfrastructureStatusHistoryResponse,
  GetInfrastructureResponse,
  UpdateInfrastructureRequest,
  UpdateInfrastructureOrderFormWorkRequest,
  UpdateInfrastructureOrderFormWorkResponse,
  UpdateInfrastructureStatusRequest,
  UpdateInfrastructureStatusResponse,
  UpdateInfrastructureResponse,
} from 'features/infrastructures/api/schemas'
import { decamelize } from 'humps'

import { baseApi } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

const infrastructuresEndpoints = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      InfrastructuresEndpointsTagsEnum.Infrastructure,
      InfrastructuresEndpointsTagsEnum.InfrastructureOrdersForms,
    ],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getInfrastructure: build.query<GetInfrastructureResponse, GetInfrastructureRequest>({
        providesTags: (result, error) =>
          error ? [] : [InfrastructuresEndpointsTagsEnum.Infrastructure],
        query: ({ infrastructureId }) => ({
          url: makeGetInfrastructureEndpoint({ infrastructureId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      updateInfrastructure: build.mutation<
        UpdateInfrastructureResponse,
        UpdateInfrastructureRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InfrastructuresEndpointsTagsEnum.Infrastructure],
        query: ({ infrastructureId, ...data }) => ({
          url: makeUpdateInfrastructureEndpoint({ infrastructureId }),
          method: HttpMethodEnum.Patch,
          data,
        }),
      }),
      updateInfrastructureStatus: build.mutation<
        UpdateInfrastructureStatusResponse,
        UpdateInfrastructureStatusRequest
      >({
        query: (data) => ({
          url: InfrastructuresEndpointsEnum.UpdateInfrastructureStatus,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      getInfrastructureStatusHistory: build.query<
        GetInfrastructureStatusHistoryResponse,
        GetInfrastructureStatusHistoryRequest
      >({
        query: (params) => ({
          url: InfrastructuresEndpointsEnum.GetInfrastructureStatusHistory,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      getInfrastructureOrdersForms: build.query<
        GetInfrastructureOrdersFormsResponse,
        GetInfrastructureOrdersFormsRequest
      >({
        providesTags: (result, error) =>
          error ? [] : [InfrastructuresEndpointsTagsEnum.InfrastructureOrdersForms],
        query: (params) => ({
          url: InfrastructuresEndpointsEnum.GetInfrastructureOrdersForms,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),
      createInfrastructureOrderForm: build.mutation<
        CreateInfrastructureOrderFormResponse,
        CreateInfrastructureOrderFormRequest
      >({
        invalidatesTags: (result, error) =>
          error ? [] : [InfrastructuresEndpointsTagsEnum.InfrastructureOrdersForms],
        query: (data) => ({
          url: InfrastructuresEndpointsEnum.CreateInfrastructureOrderForm,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),

      createInfrastructureOrderFormAttachment: build.mutation<
        CreateInfrastructureOrderFormAttachmentResponse,
        CreateInfrastructureOrderFormAttachmentRequest
      >({
        query: ({ orderFormId, file }) => {
          const formData = new FormData()
          formData.append(decamelize('orderForm'), String(orderFormId))
          formData.append('file', file)

          return {
            url: InfrastructuresEndpointsEnum.CreateInfrastructureOrdersFormAttachment,
            method: HttpMethodEnum.Post,
            data: formData,
          }
        },
      }),

      getInfrastructureOrderFormWorkTypeCost: build.query<
        GetInfrastructureOrderFormWorkTypeCostResponse,
        GetInfrastructureOrderFormWorkTypeCostRequest
      >({
        query: (params) => ({
          url: InfrastructuresEndpointsEnum.GetInfrastructureOrderFormWorkTypeCost,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      createInfrastructureOrderFormWork: build.mutation<
        CreateInfrastructureOrderFormWorkResponse,
        CreateInfrastructureOrderFormWorkRequest
      >({
        query: (data) => ({
          url: InfrastructuresEndpointsEnum.CreateInfrastructureOrderFormWork,
          method: HttpMethodEnum.Post,
          data: data,
        }),
      }),
      updateInfrastructureOrderFormWork: build.mutation<
        UpdateInfrastructureOrderFormWorkResponse,
        UpdateInfrastructureOrderFormWorkRequest
      >({
        query: ({ infrastructureWorkId, ...data }) => ({
          url: makeUpdateInfrastructureOrderFormWorkEndpoint(infrastructureWorkId),
          method: HttpMethodEnum.Put,
          data: data,
        }),
      }),

      deleteInfrastructureOrdersFormsWork: build.mutation<
        DeleteInfrastructureOrdersFormsWorkResponse,
        DeleteInfrastructureOrdersFormsWorkRequest
      >({
        query: ({ infrastructureWorkId }) => ({
          url: makeDeleteInfrastructureOrdersFormsWorkEndpoint({ infrastructureWorkId }),
          method: HttpMethodEnum.Delete,
        }),
      }),
    }),
  })

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,
  useUpdateInfrastructureStatusMutation,
  useGetInfrastructureStatusHistoryQuery,
  useCreateInfrastructureOrderFormMutation,
  useGetInfrastructureOrdersFormsQuery,

  useCreateInfrastructureOrderFormAttachmentMutation,

  useLazyGetInfrastructureOrderFormWorkTypeCostQuery,

  useCreateInfrastructureOrderFormWorkMutation,
  useUpdateInfrastructureOrderFormWorkMutation,
  useDeleteInfrastructureOrdersFormsWorkMutation,
} = infrastructuresEndpoints
