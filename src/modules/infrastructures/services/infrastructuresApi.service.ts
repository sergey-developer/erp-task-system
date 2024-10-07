import { decamelize } from 'humps'

import {
  InfrastructuresApiEnum,
  InfrastructuresApiTagEnum,
} from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormAttachmentMutationArgs,
  CreateInfrastructureOrderFormAttachmentSuccessResponse,
  CreateInfrastructureOrderFormMutationArgs,
  CreateInfrastructureOrderFormSuccessResponse,
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse,
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureSuccessResponse,
} from 'modules/infrastructures/models'
import {
  makeGetInfrastructureUrl,
  makeUpdateInfrastructureUrl,
} from 'modules/infrastructures/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { baseApiService } from 'shared/services/baseApi'

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
    }),
    overrideExisting: false,
  })

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,
  useCreateInfrastructureOrderFormMutation,
  useGetInfrastructureOrdersFormsQuery,
  useCreateInfrastructureOrderFormAttachmentMutation,
} = infrastructuresApiService
