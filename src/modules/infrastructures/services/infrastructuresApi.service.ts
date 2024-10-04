import {
  InfrastructuresApiEnum,
  InfrastructuresApiTagEnum,
} from 'modules/infrastructures/constants'
import {
  GetInfrastructureOrdersFormsQueryArgs,
  GetInfrastructureOrdersFormsSuccessResponse,
  GetInfrastructureQueryArgs,
  GetInfrastructureSuccessResponse,
  UpdateInfrastructureMutationArgs,
  UpdateInfrastructureStatusMutationArgs,
  UpdateInfrastructureStatusSuccessResponse,
  UpdateInfrastructureSuccessResponse,
} from 'modules/infrastructures/models'
import {
  makeGetInfrastructureUrl,
  makeUpdateInfrastructureUrl,
} from 'modules/infrastructures/utils/apiUrls'

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
    }),
    overrideExisting: false,
  })

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,
  useUpdateInfrastructureStatusMutation,
  useGetInfrastructureOrdersFormsQuery,
} = infrastructuresApiService
