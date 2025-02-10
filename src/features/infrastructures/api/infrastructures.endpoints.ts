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
  CreateInfrastructureOrderFormAttachmentMutationArgs,
  CreateInfrastructureOrderFormAttachmentSuccessResponse,
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse,
  CreateInfrastructureOrderFormWorkMutationArgs,
  CreateInfrastructureOrderFormWorkSuccessResponse,
  DeleteInfrastructureOrdersFormsWorkMutationArgs,
  DeleteInfrastructureOrdersFormsWorkSuccessResponse,
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
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
      getInfrastructure: build.query<GetInfrastructureSuccessResponse, GetInfrastructureQueryArgs>({
        providesTags: (result, error) =>
          error ? [] : [InfrastructuresEndpointsTagsEnum.Infrastructure],
        query: ({ infrastructureId }) => ({
          url: makeGetInfrastructureEndpoint({ infrastructureId }),
          method: HttpMethodEnum.Get,
        }),
      }),
      updateInfrastructure: build.mutation<
        UpdateInfrastructureSuccessResponse,
        UpdateInfrastructureMutationArgs
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
        UpdateInfrastructureStatusSuccessResponse,
        UpdateInfrastructureStatusMutationArgs
      >({
        query: (data) => ({
          url: InfrastructuresEndpointsEnum.UpdateInfrastructureStatus,
          method: HttpMethodEnum.Post,
          data,
        }),
      }),
      getInfrastructureStatusHistory: build.query<
        GetInfrastructureStatusHistorySuccessResponse,
        GetInfrastructureStatusHistoryQueryArgs
      >({
        query: (params) => ({
          url: InfrastructuresEndpointsEnum.GetInfrastructureStatusHistory,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      getInfrastructureOrdersForms: build.query<
        GetInfrastructureOrdersFormsSuccessResponse,
        GetInfrastructureOrdersFormsQueryArgs
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
        CreateInfrastructureOrderFormSuccessResponse,
        CreateInfrastructureOrderFormMutationArgs
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
        CreateInfrastructureOrderFormAttachmentSuccessResponse,
        CreateInfrastructureOrderFormAttachmentMutationArgs
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
        GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
        GetInfrastructureOrderFormWorkTypeCostQueryArgs
      >({
        query: (params) => ({
          url: InfrastructuresEndpointsEnum.GetInfrastructureOrderFormWorkTypeCost,
          method: HttpMethodEnum.Get,
          params,
        }),
      }),

      createInfrastructureOrderFormWork: build.mutation<
        CreateInfrastructureOrderFormWorkSuccessResponse,
        CreateInfrastructureOrderFormWorkMutationArgs
      >({
        query: (data) => ({
          url: InfrastructuresEndpointsEnum.CreateInfrastructureOrderFormWork,
          method: HttpMethodEnum.Post,
          data: data,
        }),
      }),
      updateInfrastructureOrderFormWork: build.mutation<
        UpdateInfrastructureOrderFormWorkSuccessResponse,
        UpdateInfrastructureOrderFormWorkMutationArgs
      >({
        query: ({ infrastructureWorkId, ...data }) => ({
          url: makeUpdateInfrastructureOrderFormWorkEndpoint(infrastructureWorkId),
          method: HttpMethodEnum.Put,
          data: data,
        }),
      }),

      deleteInfrastructureOrdersFormsWork: build.mutation<
        DeleteInfrastructureOrdersFormsWorkSuccessResponse,
        DeleteInfrastructureOrdersFormsWorkMutationArgs
      >({
        query: ({ infrastructureWorkId }) => ({
          url: makeDeleteInfrastructureOrdersFormsWorkEndpoint({ infrastructureWorkId }),
          method: HttpMethodEnum.Delete,
        }),
      }),
    }),
    overrideExisting: false,
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
