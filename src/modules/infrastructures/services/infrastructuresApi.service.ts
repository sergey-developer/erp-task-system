import {
  InfrastructuresApiEnum,
  InfrastructuresApiTagEnum,
} from 'modules/infrastructures/constants'
import {
  CreateInfrastructureOrderFormWorksMutationArgs,
  CreateInfrastructureOrderFormWorksSuccessResponse,
  GetInfrastructureOrderFormWorkTypeCostQueryArgs,
  GetInfrastructureOrderFormWorkTypeCostSuccessResponse,
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
    }),
    overrideExisting: false,
  })

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,
  useGetInfrastructureOrdersFormsQuery,

  useLazyGetInfrastructureOrderFormWorkTypeCostQuery,

  useCreateInfrastructureOrderFormWorksMutation,
} = infrastructuresApiService
