import { InfrastructuresApiEnum } from 'modules/infrastructures/constants'
import {
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

const infrastructuresApiService = baseApiService.injectEndpoints({
  endpoints: (build) => ({
    getInfrastructure: build.query<GetInfrastructureSuccessResponse, GetInfrastructureQueryArgs>({
      query: ({ infrastructureId }) => ({
        url: makeGetInfrastructureUrl({ infrastructureId }),
        method: HttpMethodEnum.Get,
      }),
    }),
    updateInfrastructure: build.mutation<
      UpdateInfrastructureSuccessResponse,
      UpdateInfrastructureMutationArgs
    >({
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
  }),
  overrideExisting: false,
})

export const {
  useGetInfrastructureQuery,
  useUpdateInfrastructureMutation,
  useGetInfrastructureOrdersFormsQuery,
} = infrastructuresApiService
