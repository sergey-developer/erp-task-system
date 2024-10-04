import { decamelize } from 'humps'

import {
  InfrastructuresApiEnum,
  InfrastructuresApiTagEnum,
} from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormAttachmentMutationArgs,
  CreateInfrastructureOrderFormAttachmentSuccessResponse,
  CreateInfrastructureOrderFormWorksMutationArgs,
  CreateInfrastructureOrderFormWorksSuccessResponse,
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

const infrastructuresApiService = baseApiService
  .enhanceEndpoints({ addTagTypes: [InfrastructuresApiTagEnum.Infrastructure] })
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
        query: (params) => ({
          url: InfrastructuresApiEnum.GetInfrastructureOrdersForms,
          method: HttpMethodEnum.Get,
          params,
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

      createInfrastructureOrderFormWorks: build.mutation<
        CreateInfrastructureOrderFormWorksSuccessResponse,
        CreateInfrastructureOrderFormWorksMutationArgs
      >({
        query: (data) => ({
          url: InfrastructuresApiEnum.CreateInfrastructureOrderFormWorks,
          method: HttpMethodEnum.Post,
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
  useUpdateInfrastructureStatusMutation,
  useGetInfrastructureStatusHistoryQuery,
  useGetInfrastructureOrdersFormsQuery,

  useCreateInfrastructureOrderFormAttachmentMutation,

  useLazyGetInfrastructureOrderFormWorkTypeCostQuery,

  useCreateInfrastructureOrderFormWorksMutation,
  useDeleteInfrastructureOrdersFormsWorkMutation,
} = infrastructuresApiService
