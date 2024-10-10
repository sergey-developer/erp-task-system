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
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse,
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureOrderFormWorkMutationArgs,
  UpdateInfrastructureOrderFormWorkSuccessResponse,
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
  useGetInfrastructureOrdersFormsQuery,

  useLazyGetInfrastructureOrderFormWorkTypeCostQuery,

  useCreateInfrastructureOrderFormWorkMutation,
  useUpdateInfrastructureOrderFormWorkMutation,
  useDeleteInfrastructureOrdersFormsWorkMutation,
} = infrastructuresApiService
